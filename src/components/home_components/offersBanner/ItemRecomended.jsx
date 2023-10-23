const ItemRecomended = () => {
    return (
        <div class=" bg-white rounded-xl border border-1 border-gray-200 cursor-pointer" onClick={console.log("")}>
            <img src="https://media-cdn.tripadvisor.com/media/photo-s/1d/58/37/0f/caption.jpg" alt="Imagen de ejemplo" class="h-44 w-full object-cover rounded-t-xl" />
            <div class="p-4">
                <h2 class="text-greenTitle font-bold text-center text-lg">Villa Ana María</h2>
                <div class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blueLight">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p class="text-base text-blueLight text-base" >Cuenca</p>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <h2 class="text-greenTitle  text-center text-lg leading-5">La mejor opción </h2>
                </div>
                <div class="grid grid-cols-2 flex items-center ">
                    <div class="col-span-1 flex justify-end  ">
                        <h2 class="text-right text-greenVE-500 font-bold text-4xl pr-1">$61/</h2>
                    </div>
                    <div class="col-span-1 pl-1">
                        <h2 class="text-xs text-greenVE-500"> 2 día, 1 noche</h2>
                        <h2 class="text-xs text-greenVE-500">1 adulto</h2>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ItemRecomended;