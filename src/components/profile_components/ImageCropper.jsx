import { useCallback, useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "../../setCanvasPreview";
import { useDropzone } from "react-dropzone";
import { saveRemotePhoto } from "../../controllers/perfil/perfilController";
import { Spinner } from "@material-tailwind/react";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateProfilePhoto }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;
            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader();
        reader.onload = () => {
            setImgSrc(reader.result);
            //setImage(reader.result);
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleGuardarFoto = () => {
        setIsLoading(true);
        setCanvasPreview(
            imgRef.current, // HTMLImageElement
            previewCanvasRef.current, // HTMLCanvasElement
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL();
        saveRemotePhoto(dataUrl).then((result) => {
            if (result) {
                if(result==401){
                    localStorage.removeItem("datos")
                    window.location.reload();
                }else{
                    updateProfilePhoto(dataUrl);
                    closeModal(true);
                    window.location.reload();
                }
            } else {
                setIsLoading(false);
                setError("Ha ocurrido un error")
            }
        })
    }

    return (
        <>
            <label className="block mb-3 w-fit">
                <span className="sr-only">Elija una foto</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-greenVE-500 file:text-white hover:file:bg-greenVE-600 cursor-pointer"
                />
            </label>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            {imgSrc ? (
                <div className="flex flex-col items-center">

                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            style={{ maxWidth: "100%", maxHeight: "45vh" }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <button
                        className="text-white flex items-center justify-center w-full h-8 font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
                        onClick={() => {
                            if (!isLoading) {
                                handleGuardarFoto();
                            }
                        }}
                    >
                        {
                            isLoading
                                ? <Spinner color="white" className="h-5"></Spinner>
                                : "Guardar Imagen"
                        }
                    </button>
                </div>
            ) : <div className="h-auto w-auto  rounded-xl">
                <div className="flex items-center justify-center min-h-[50vh] max-h-[50vh] w-full rounded-xl bg-gray-300 border-4 border-greenVE-500 border-dashed">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="md:text-3xl sm:text-base  text-center px-4 text-gray-500">O arrastra una imagen a esta zona para continuar</p>
                    </div>
                </div>
            </div>
            }
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: "100%",
                        maxWidth: "150px",  // Tamaño máximo del canvas
                        height: "auto",     // Se ajusta automáticamente según el ancho
                    }}
                />
            )}
        </>
    );
};
export default ImageCropper;