import React from "react";
import "./FilterProducts.css"

interface Item {
    id: number;
    text: string;
    completed: boolean;
}

interface Props {
    lists: Item[];
}

export const FilterProducts: React.FC<Props> = ({ lists }) => {
    const productToBuy = lists.filter((list) => !list.completed);
    const boughtProduct = lists.filter((list) => list.completed);

    return (
        <div className="filter-container">
            <div>Para comprar: {productToBuy.length}</div>
            <div>Comprados: {boughtProduct.length}</div>
        </div>
    );
};


