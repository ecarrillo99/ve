import React from 'react';
import SearchResultItem from './SearchResultItem';

const SearchResult = ({Establecimientos, filtro, Destacado, options, date, destination}) => {
    return (
        <>
        {
            Establecimientos
            ?<>
            {
                Establecimientos.map((item, index)=>(
                    <div className=''>
                        <SearchResultItem 
                            Establecimiento={item} filtro={filtro}
                            PrimerElemento={index===0?Destacado?true:false:false}
                            options={options}
                            date={date}
                            destination={destination}
                        ></SearchResultItem>
                    </div>
                ))
            }
            </>
            :<div></div>
        }
        </>
    );
};

export default SearchResult;