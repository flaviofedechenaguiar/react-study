import React from 'react';

const PromotionForm = () => {

    const promotion = {
        "title": "Kit Notebook Acer Aspire 3 + Mochila Green, A315-41-R790, AMD Ryzen 3 2200U Dual Core",
        "price": 1799,
        "url": "",
        "imageUrl": "https://cdn.gatry.com/gatry-static/promocao/imagem_url/2631517face1861bc4f46ae154d387de.png"
    };


    return (<div>
        <h1>Promo Show</h1>
        <h2>Nova Promoção</h2>

        <form>
            <div className="promotion-form__group">
                <label htmlFor="title">Título</label>
                <input id="title" name="title" />
            </div>


        </form>
    </div>);
}

export default PromotionForm;