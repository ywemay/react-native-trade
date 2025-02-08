import { useState } from "react";

export default function useSelection() {

  const [ selected, setSelected ] = useState([]);

  const dropSelection = () => setSelected([]);

  const addToSelection = (id)  => setSelected(prev => {
    if (!prev.includes(id)) return [...prev, id];
    return prev;  
  })

  const dropFromSelection = (id) => setSelected(prev => prev.filter(i => i !== id))

  const toggleSelected = (id) => setSelected(prev => {
    if (!prev.includes(id)) return [...prev, id];
    else return prev.filter(i => i !== id);
  })

  const isSelected = (id) => selected.includes(id);

  return { selected, setSelected, addToSelection, dropSelection, dropFromSelection, toggleSelected, isSelected };
}