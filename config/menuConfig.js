export const menus = [
  {
    subKey: 'sub1',
    subIcon: 'appstore',
    subText: 'Dashboard',
    subLink: "/dashboard",
    subItem: []
  },
  {
    subKey: 'sub2',
    subIcon: 'user',
    subText: 'Product',
    subLink: undefined,
    subItem: [
      {
        itemKey: 'sub2.1',
        itemLink: '/product',
        itemIcon: 'unordered-list',
        itemText: 'Manage products'
      },
      {
        itemKey: 'sub2.2',
        itemLink: '/product/create',
        itemIcon: 'plus-square',
        itemText: 'Create new product'
      }
    ]
  },
  {
    subKey: 'sub3',
    subIcon: 'team',
    subText: 'Employee',
    subLink: undefined,
    subItem: [
      {
        itemKey: 'sub3.1',
        itemLink: '/employee',
        itemIcon: 'unordered-list',
        itemText: 'Manage employee'
      },
      {
        itemKey: 'sub3.2',
        itemLink: '/employee/create',
        itemIcon: 'plus-square',
        itemText: 'Create new employee'
      }
    ]
  },
  {
    subKey: 'sub4',
    subIcon: 'medium',
    subText: 'Category',
    subLink: undefined,
    subItem: [
      {
        itemKey: 'sub4.1',
        itemLink: '/category',
        itemIcon: 'unordered-list',
        itemText: 'Manage Category'
      },
      {
        itemKey: 'sub4.2',
        itemLink: '/category/create',
        itemIcon: 'plus-square',
        itemText: 'Create new category'
      }
    ]
  },
  {
    subKey: 'sub5',
    subIcon: 'form',
    subText: 'Inventory',
    subLink: undefined,
    subItem: [
      {
        itemKey: 'sub5.1',
        itemLink: '/inventory',
        itemIcon: 'unordered-list',
        itemText: 'Manage Inventory'
      },
      {
        itemKey: 'sub5.2',
        itemLink: '/inventory',
        itemIcon: 'plus-square',
        itemText: 'Create new inventory'
      }
    ]
  },
  {
    subKey: 'sub6',
    subIcon: 'schedule',
    subText: 'Inventory Details',
    subLink: undefined,
    subItem: [
      {
        itemKey: 'sub5.1',
        itemLink: '/school',
        itemIcon: 'unordered-list',
        itemText: 'Manage Inventory Details'
      },
      {
        itemKey: 'sub5.2',
        itemLink: '/school/create',
        itemIcon: 'plus-square',
        itemText: 'Create new school'
      }
    ]
  },
  {
    subKey: 'sub7',
    subIcon: 'form',
    subText: 'Bills',
    subLink: undefined,
    subItem: [
      {
        itemKey: 'sub7.1',
        itemLink: '/bills',
        itemIcon: 'unordered-list',
        itemText: 'Manage Bills'
      }
    ]
  },
  {
    subKey: 'sub8',
    subIcon: 'unordered-list',
    subText: 'Unit',
    subLink: "/unit",
    subItem: [
    ]
  },
]
/**
 * Find Parent menu in array menus by path
 * @param {String} path 
 * @param {Array} menuItem 
 */
function findMenuItemByPath(path, menuItem) {
  return menuItem.find(item => item.subLink == path);
}
/**
 * Find Sub menu in array menus.subItem by path
 * @param {String} path 
 * @param {Arrray} subItemArray 
 */
function findSubItemByPath(path, subItemArray) {
  return subItemArray.find(item => item.itemLink == path);
}

export const getOpenKeys = (path, menus) => {
  let openKeysSelected;
  const subMenu = findMenuItemByPath(path, menus);
  if (subMenu !== undefined) {
    openKeysSelected = subMenu.subKey
  } else {
    for (let item of menus) {
      const subItem = findSubItemByPath(path, item.subItem);
      if (subItem !== undefined) {
        openKeysSelected = item.subKey
      }
    }
  }
  return [openKeysSelected];
}

export const getDefaultKeys = (path, menus) => {
  let openDefaultKeys;

  const subMenu = findMenuItemByPath(path, menus);
  if (subMenu !== undefined) {
    openDefaultKeys = subMenu.subKey
  }
  if (subMenu === undefined) {
    for (let item of menus) {
      const subItem = findSubItemByPath(path, item.subItem);
      if (subItem !== undefined) {
        openDefaultKeys = subItem.itemKey
      }
    }
  }
  return [openDefaultKeys]
}

export const rootSubmenuKeys = menus.map(item => {
  return item.subKey
})