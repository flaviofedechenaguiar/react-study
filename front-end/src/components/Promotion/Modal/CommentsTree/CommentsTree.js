import React, { useState, useMemo } from 'react';
import './CommentsTree.css'

function getTree(list) {
    console.log('EXECUTE');
    if (!list) {
        list = [];
    }
    const roots = [];
    const childrenByParentId = {};
    list.forEach(item => {
        if (!item.parentId) {
            roots.push(item);
            return;
        }
        if (!childrenByParentId[item.parentId]) {
            childrenByParentId[item.parentId] = []
        }
        childrenByParentId[item.parentId].push(item);
    });

    function buildNode(nodes) {
        if (!nodes) {
            return null;
        }
        return nodes.map((node) => {
            return {
                ...node,
                children: buildNode(childrenByParentId[node.id])
            }
        });
    }
    return buildNode(roots);
}

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
    const tree = useMemo(() => getTree(comments), [comments]);
    const [comment, setComment] = useState('');
    const [activeCommentBox, setActiveCommentBox] = useState(null);

    if (!comments) {
        return <div>Carregando...</div>
    }

    function renderItem(item) {
        return (
            <li key={item.id} className="promotion-modal-comments-tree__item">
                <img className="promotion-modal-comments-tree__item__avatar" src={item.user.avatarUrl} alt={`foto de ${item.user.name}`} />
                <div className="promotion-modal-comments-tree__item__info">
                    <span className="promotion-modal-comments-tree__item__name" >{item.user.name}</span>
                    <p>{item.comment}</p>
                    <button
                        type="button"
                        className="promotion-modal-comments-tree__answer-button"
                        onClick={() => {
                            setComment('');
                            setActiveCommentBox(activeCommentBox === item.id ? null : item.id)
                        }}>
                        Responder</button>
                    {activeCommentBox === item.id && (
                        <div className="promotion-modal-comments-tree__comment-box">
                            <textarea value={comment} onChange={(event) => { setComment(event.target.value) }} />
                            <button
                                type="button"
                                className="promotion-modal-comments-tree__send-button"
                                onClick={() => {
                                    sendComment(comment, item.id);
                                    setComment('');
                                    setActiveCommentBox(null);
                                }}>Enviar</button>
                        </div>
                    )}
                    {item.children && renderList(item.children)}

                </div>
            </li>);
    }

    function renderList(list) {
        return (
            <ul className="promotion-modal-comments-tree">
                {list.map(item => renderItem(item))}
            </ul>
        );
    }

    return renderList(tree);
}

PromotionModalCommentsTree.defaultProps = {
    sendComment: (comment, parentId) => {
        console.log(comment, parentId);
    }
}


export default PromotionModalCommentsTree;