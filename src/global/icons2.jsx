export function getIcon({text, h="", w="", c=""}) {
    return text.toLowerCase().includes("atividades extra")
    ?<span className={`icon-[mdi--plus] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("bar - cafetería")
    ?<span className={`icon-[solar--bar-chair-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("consigna de equipaje")
    ?<span className={`icon-[streamline--bag-suitcase-2 ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("gimnasio")
    ?<span className={`icon-[ph--barbell-light] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("jacuzzi")
    ?<span className={`icon-[material-symbols-light--bathtub-outline-sharp] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("lavandería / tintorería")
    ?<span className={`icon-[iconoir--washing-machine] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("parqueadero")
    ?<span className={`icon-[tabler--parking] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("parqueo")
    ?<span className={`icon-[tabler--parking] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("piscina")
    ?<span className={`icon-[material-symbols-light--pool] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("restaurant")
    ?<span className={`icon-[material-symbols-light--restaurant] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("spa")
    ?<span className={`icon-[material-symbols--spa-outline-rounded] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("sauna")
    ?<span className={`icon-[material-symbols-light--sauna-outline-rounded] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("turco")
    ?<span className={`icon-[material-symbols-light--sauna-outline-rounded] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("servicio de seguridad")
    ?<span className={`icon-[streamline--interface-security-shield-2-shield-protection-security-defend-crime-war-cover] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("wireless")
    ?<span className={`icon-[material-symbols-light--wifi] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("aire acondicionado")
    ?<span className={`icon-[material-symbols-light--climate-mini-split-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("cargo por no show")
    ?<span className={`icon-[f7--money-dollar] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("ejecutivo")
    ?<span className={`icon-[bi--luggage] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("estadía a corto y largo plazo")
    ?<span className={`icon-[ri--hotel-line] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("fiestas de cuenca")
    ?<span className={`icon-[game-icons--party-flags] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("hora check")
    ?<span className={`icon-[iconamoon--clock-thin] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("pasajero adicional")
    ?<span className={`icon-[ph--user-plus-light] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("se admite mascotas")
    ?<span className={`icon-[material-symbols-light--pet-supplies-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("se admiten mascotas")
    ?<span className={`icon-[material-symbols-light--pet-supplies-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("bebida de bienvenida")
    ?<span className={`icon-[carbon--drink-02] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("almuerzos")
    ?<span className={`icon-[material-symbols-light--lunch-dining-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("calefaccion")
    ?<span className={`icon-[material-symbols--air-purifier-gen-outline-rounded] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("cena")
    ?<span className={`icon-[material-symbols-light--dinner-dining-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("desayuno")
    ?<span className={`icon-[ph--coffee-light] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("snack")
    ?<span className={`icon-[ph--popcorn] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("tour")
    ?<span className={`icon-[icon-park-outline--tour-bus] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("transfer aeropuerto hotel")
    ?<span className={`icon-[icons8--airport] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("uso de instalaciones")
    ?<span className={`icon-[material-symbols-light--park-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("10% servicios")
    ?<span className={`icon-[iconoir--percent-rotate-out] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("iva")
    ?<span className={`icon-[iconoir--percent-rotate-out] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("seguro hotelero")
    ?<span className={`icon-[icon-park-outline--people-safe-one] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("tasa municipal")
    ?<span className={`icon-[tdesign--city-ancient-1] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("edad de niños")
    ?<span className={`icon-[material-symbols--child-care-outline] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("feriado")
    ?<span className={`icon-[material-symbols-light--calendar-month-outline-rounded] ${h} ${w} ${c}`}></span>
    :text.toLowerCase().includes("no niños")
    ?<span className={`icon-[fluent--person-prohibited-24-regular] ${h} ${w} ${c}`}></span>
    :<span className={`icon-[carbon--service-desk] ${h} ${w} ${c} `}></span>
}