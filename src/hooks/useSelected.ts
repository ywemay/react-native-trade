import { useState } from 'react';
import { useTheme } from '@rneui/themed';

export default function useSelected() {

  const [ selected, setSelected ] = useState([]);
  const { theme: {colors} } = useTheme();
  
  const toggleSelected = ({id}) => {
    setSelected(prev => {
      const index = prev.indexOf(id);
      if (index !== -1) {
        const a = [...prev]
        a.splice(index, 1)
        return a;
      }
      return [...prev, id]
    })
  }

  const isSelected = (id) => {
    return selected.indexOf(id) !== -1;
  }

  const getSelectedColor = (id) => {
    return isSelected(id) ? colors.black : colors.white;
  }

  const clearSelection = () => setSelected([]);

  return { selected, setSelected, isSelected, toggleSelected, clearSelection, getSelectedColor }
}