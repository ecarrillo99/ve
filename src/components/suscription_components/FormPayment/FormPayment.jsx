import Icons from "../../../global/icons"

const FormPayment = ({cambioSlider,formPago}) => {
    const icons=new Icons();
    return (
        <div className="w-full flex justify-center">
            <div className="w-1/3">
            <div className="flex gap-2 justify-center mb-4 items-center">
                <div className="cursor-pointer" onClick={() => cambioSlider(2)} dangerouslySetInnerHTML={{ __html: icons.Data.Back }} />
                <div className="flex bg-greenVE-500 h-7 w-7 justify-center items-center text-white font-bold rounded-full">4</div>
                <label className="font-semibold">Finalizar pago</label>
            </div>
            {formPago}
        </div>
        </div>
    )
}
export default FormPayment