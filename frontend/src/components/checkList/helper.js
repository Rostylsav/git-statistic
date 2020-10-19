const getItemId = () => 
    Math.floor((Math.random() * 1000000) + 1)

export const getNewItemObj = value => ({
    id: getItemId(),
    name: value,
    isExist: false,
    isChecked: false,
});

export const getItemIds = items => items.map( item => item.id);
export const getSelectedItemIds = items => items.filter(item => item.isChecked)