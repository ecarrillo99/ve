import React from "react";

const Reservar=()=>{
    return (
        <div>
            <h2 className="text-xl font-medium text-red-700 mb-4">¿Cómo reservar?</h2>
            <div className="relative overflow-hidden pb-56 h-0">
                <iframe
                    className="absolute top-0 left-0 w-full h-full border-0"
                    src="https://www.youtube.com/embed/VFjswE0are8?si=3jIR-C8zNrtr8Rhw"
                    title="Como reservar por nuestra APP"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
export default Reservar;
