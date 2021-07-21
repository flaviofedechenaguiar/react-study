import React, { useEffect, useState } from 'react';
import UIModal from 'components/UI/Modal/Modal'
import useApi from 'components/Utils/useApi'
import PromotionModalCommentsTree from 'components/Promotion/Modal/CommentsTree/CommentsTree'
import '../Modal/Modal.css'


const PromotionModal = ({ promotionId, onClickClose }) => {
    const [comment, setComment] = useState('');

    const [load, loadInfo] = useApi({
        url: '/comments',
        params: {
            promotionId,
            _expand: 'user'
        }
    });

    const [sendComment, sendCommentInfo] = useApi({
        url: '/comments',
        method: 'POST',
        params: {
            promotionId,
            _expand: 'user'
        }
    });

    useEffect(() => {
        load();
    }, []);


    async function onSubmit(event) {
        event.preventDefault();
        try {
            await sendComment({
                data: {
                    userId: 1,
                    promotionId,
                    comment,
                }
            });
            setComment('');
            load({ quietly: true });
        } catch (err) {

        };
    }

    async function sendAnswer(text, parentId) {
        await sendComment({
            data: {
                userId: 1,
                promotionId,
                comment: text,
                parentId
            }
        });
        load({ quietly: true });
    }

    return (
        <UIModal isOpen={Boolean(promotionId)} onClickClose={onClickClose}>
            <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
                <textarea placeholder="Comentar..." onChange={(event) => setComment(event.target.value)} value={comment}
                    disabled={sendCommentInfo.loading} />
                <button
                    disabled={sendCommentInfo.loading}>
                    {sendCommentInfo.loading ? 'Enviando...' : 'Enviar'}</button>
            </form>
            <PromotionModalCommentsTree comments={loadInfo.data} sendComment={sendAnswer}></PromotionModalCommentsTree>
        </UIModal>
    );
}

export default PromotionModal;