import React, { useState } from 'react';
import PromotionCard from '../Card/Card';
import PromotionModal from '../Modal/Modal';
import './List.css'

const PromotionList = ({ loading, promotions, error }) => {
    const [promotionId, setPromotionId] = useState(null);

    if (error) {
        return <div>Ocorreu um erro inesperado</div>
    }

    if (loading || promotions === null) {
        return <div>Carregando...</div>;
    }

    if (promotions.length === 0) {
        return <div>Nenhum resultado encontrado</div>
    }

    return (
        <div className="promotion-list">
            {promotions.map(promotion => (
                <PromotionCard
                    promotion={promotion}
                    key={promotion.id}
                    onClickComments={() => {
                        setPromotionId(promotion.id)
                    }}>
                </PromotionCard>

            ))}
            {/* <UIModal isOpen={Boolean(promotionId)} onClickClose={() => { setPromotionId(null) }}>
                <h1>Comentários</h1>
            </UIModal> */}
            {promotionId && (
                <PromotionModal promotionId={promotionId} onClickClose={() => setPromotionId(null)} />
            )}

        </div>
    )
}

export default PromotionList;