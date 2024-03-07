import React, { useState, useEffect } from "react";
import { FilterProducts }from "../FilterProducts/FilterProducts";
import "./ProductList.css"
import { toast, Toaster } from "react-hot-toast";


interface Item {
    id: number;
    text: string;
    completed: boolean;
}

export const ProductList: React.FC = () => {
    const initialLists: Item[] = JSON.parse(localStorage.getItem("lists") || "[]");

    const [lists, setLists] = useState<Item[]>(initialLists);
    const [input, setInput] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null); 
    const [editedText, setEditedText] = useState<string>(""); 

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(lists));
    }, [lists]);

    const handleToggle = (id: number) => {
        const updatedLists = lists.map((list) => {
            if (list.id === id) {
                return { ...list, completed: !list.completed };
            }
            return list;
        });

        const completedItems = updatedLists.filter((list) => list.completed);
        const incompletedItems = updatedLists.filter((list) => !list.completed);

        setLists([...incompletedItems, ...completedItems]);
    };

   const handleClick = () => {
        if (input.trim() !== "") {
            const newProduct: Item = { id: Date.now(), text: input, completed: false };

            const firstCompletedIndex = lists.findIndex((list) => list.completed);
            if (firstCompletedIndex !== -1) {
                
                const updatedLists = [
                    ...lists.slice(0, firstCompletedIndex),
                    newProduct,
                    ...lists.slice(firstCompletedIndex)
                ];
                setLists(updatedLists);
            } else {
              
                setLists([newProduct, ...lists]);
            }

            setInput("");
            
        } else {
            toast.error("Ingrese el nombre del producto", { duration: 1000 }); // Відобразити повідомлення про помилку
        }
    };

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleClick(); 
        }
    };

    
    const handleDelete = (id: number) => {
        setLists(lists.filter((list) => list.id !== id));
    };

    const handleEdit = (id: number, text: string) => {
        setEditingId(id);
        setEditedText(text); 
    };

    const handleSave = () => {
        if (editingId !== null) {
            setLists(
                lists.map((list) => {
                    if (list.id === editingId) {
                        return { ...list, text: editedText };
                    }
                    return list;
                })
            );
            setEditingId(null); 
            setEditedText(""); 
        }
    };

    return (
        <div>
    
    <FilterProducts lists={lists}/>
    <Toaster/>
    <div className="box">
  <input className="add-input" type="text" placeholder="Producto" value={input} required onChange={(e) => setInput(e.currentTarget.value)}  onKeyDown={handleEnterPress} />
  <button className="add-button" onClick={handleClick}>Añadir</button>
</div>

            <ul>
                {lists.map((list) => (
                    <li className="input-container" key={list.id}>
                        <input className="checkbox-custom" type="checkbox" checked={list.completed} onChange={() => handleToggle(list.id)} />
                        {editingId === list.id ? (
                            <>
                                <input className="text-input" type="text" value={editedText} onChange={(e) => setEditedText(e.currentTarget.value)} />
                                <button className="button-container" onClick={handleSave}>
                                    <img src="save.svg" alt="save" /></button>
                            </>
                        ) : (
                            <>
                                <span style={{ textDecoration: list.completed ? "line-through" : "none" }}>{list.text}</span>
                                <button className="button-container" onClick={() => handleEdit(list.id, list.text)} >
                                    <img src="add.svg" alt="edit" width={38} height={38}/></button>
                            </>
                        )}
                        <button className="button-container" onClick={() => handleDelete(list.id)}>
                            <img src="eliminar.svg" alt="delete"/></button>
                    </li>
                ))}
            </ul>

            
        </div>
    );
};
