import React from 'react';
import { useParams } from 'react-router-dom'
import PromotionForm from 'components/Promotion/Form/Form';
import UIContainer from 'components/UI/Container/Container'

const PagesPromotionForm = () => {
    const { id } = useParams();


    const promotion = {
        "title": "Kit Notebook Acer Aspire 3 + Mochila Green, A315-41-R790, AMD Ryzen 3 2200U Dual Core",
        "price": 1799,
        "url": "",
        "imageUrl": "https://cdn.gatry.com/gatry-static/promocao/imagem_url/2631517face1861bc4f46ae154d387de.png"
    };



    return (
        <UIContainer>
            <PromotionForm />
        </UIContainer>
    );
}

export default PagesPromotionForm;