const DestinoItem = ({destino}) => {
    return (<div class="rounded-lg border-4 border-white">
        <div className="">
            <img src={destino.Icono} class="h-36 w-full object-cover rounded-md" />
        </div>
        <div className="flex flex-col">
            <label className="font-medium text-base">{destino.Titulo}</label>
            <label className="font-light text-sm">{destino.Valor}</label>
        </div>
    </div>)
}
export default DestinoItem;