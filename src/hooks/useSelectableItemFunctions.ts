export default function useSelectableItemFunctions(params) {

  const { item, onPressRewrite, onPress, onLongPress, selected, toggleSelected, isSelected, ...rest } = params;

  const handlePress = onPressRewrite ? () => onPressRewrite(item) : () => {
    if (selected && selected.length > 0) toggleSelected(item);
    else {
      onPress ? onPress(item) : toggleSelected(item);
    }
  }

  const handleLongPress = () => onLongPress ? onLongPress(item) : toggleSelected(item);

  const bSelected = isSelected(item.id);

  return {
    onPress: handlePress,
    onLongPress: handleLongPress,
    isSelected: bSelected,
    item,
    rest
  }
}