import { useTheme } from '@rneui/themed'

export default function useStackSearchBar({ onSearch }) {
  const { theme: { colors }} = useTheme();

  const headerSearchBarOptions = {
    placeholder: 'Search',
    onSearchButtonPress: (ev) => onSearch(ev.nativeEvent.text),
    onBlur: (e) => onSearch(''),
    textColor: colors.black,
    tintColor: colors.black,
    hintTextColor: colors.grey0,
    headerIconColor: colors.black,
  }

  return { headerSearchBarOptions }
}