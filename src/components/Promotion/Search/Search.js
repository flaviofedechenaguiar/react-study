import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import useApi from 'components/Utils/useApi';
import { Link } from 'react-router-dom';
import PromotionList from '../List/List';
import './Search.css';

const PromotionSearch = () => {
    const mountRef = useRef(null);
    // const [promotions, setPromotions] = useState([]);
    const [search, setSearch] = useState('');

    const [load, loadInfo] = useApi({
        // url: 'http://localhost:5000/promotions',
        debounceDelay: 300,
        url: '/promotions',
        method: 'get',
        params: {
            _embed: 'comments',
            _order: 'desc',
            _sort: 'id',
            title_like: search || undefined,
        },
        // onCompleted: (response) => {
        //     setPromotions(response.data);
        // }
    });



    // const params = {};
    // if (search) {
    //     params.title_like = search;
    // }
    // useEffect(() => {
    //     axios.get('http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id', { params })
    //         .then((response) => {
    //             setPromotions(response.data);
    //         })

    // }, [search]);



    console.log(loadInfo.data);



    useEffect(() => {
        load({
            debounced: mountRef.current 
        });
    
        if (!mountRef.current) {
            mountRef.current = true;
        }
    }, [search]);

    return (
        <div className="promotion-search">
            <header className="promotion-search__header">
                <h1>Promo Show</h1>
                <Link to="/create">Nova Promoção</Link>
            </header>
            <input
                type="search"
                className="promotion-search__input"
                placeholder="Buscar"
                value={search}
                onChange={(event) => { setSearch(event.target.value) }}
            />
            {/* <PromotionList promotions={promotions} loading={!promotions.length}></PromotionList> */}
            <PromotionList
                promotions={loadInfo.data}
                loading={loadInfo.loading}
                error={loadInfo.error}>
            </PromotionList>
        </div>
    );

}

export default PromotionSearch;