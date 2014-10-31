require.config({
    baseUrl: "scripts"
});

require(['MenuManager'], function(MenuManager) {

    'use strict';

    var menu = MenuManager.create({
        type: 'menu',
        orientation: 'horizontal',
        items: [
            {
                type: 'submenu',
                activateOn: 'mouseenter',
                caption: 'Menu 1',
                items: [
                    {
                        type: 'item',
                        caption: 'item 1',
                        value: 'item1'
                    },
                    {
                        type: 'item',
                        caption: 'item 2',
                        value: 'item2'
                    },
                    {
                        type: 'submenu',
                        activateOn: 'mouseenter',
                        caption: 'submenu 1',
                        dropdownPosition: 'horizontal',
                        items: [
                            {
                                type: 'item',
                                caption: 'item 1',
                                value: 'item1'
                            },
                            {
                                type: 'item',
                                caption: 'item 2',
                                value: 'item2'
                            }
                        ]
                    },
                    {
                        type: 'submenu',
                        activateOn: 'mouseenter',
                        caption: 'submenu 1',
                        dropdownPosition: 'horizontal',
                        items: [
                            {
                                type: 'item',
                                caption: 'item 1',
                                value: 'item1'
                            },
                            {
                                type: 'item',
                                caption: 'item 2',
                                value: 'item2'
                            }
                        ]
                    },
                    {
                        type: 'item',
                        caption: 'item 4',
                        value: 'item4'
                    }
                ]
            },
            {
                type: 'submenu',
                activateOn: 'mouseenter',
                caption: 'Menu 1',
                items: [
                    {
                        type: 'item',
                        caption: 'item 1',
                        value: 'item1'
                    },
                    {
                        type: 'item',
                        caption: 'item 2',
                        value: 'item2'
                    },
                    {
                        type: 'submenu',
                        activateOn: 'mouseenter',
                        caption: 'submenu 1',
                        dropdownPosition: 'horizontal',
                        items: [
                            {
                                type: 'item',
                                caption: 'item 1',
                                value: 'item1'
                            },
                            {
                                type: 'submenu',
                                activateOn: 'mouseenter',
                                caption: 'submenu 1',
                                dropdownPosition: 'horizontal',
                                items: [
                                    {
                                        type: 'item',
                                        caption: 'item 1',
                                        value: 'item1'
                                    },
                                    {
                                        type: 'item',
                                        caption: 'item 2',
                                        value: 'item2'
                                    },
                                    {
                                        type: 'submenu',
                                        activateOn: 'mouseenter',
                                        caption: 'submenu 1',
                                        dropdownPosition: 'horizontal',
                                        items: [
                                            {
                                                type: 'item',
                                                caption: 'item 1',
                                                value: 'item1'
                                            },
                                            {
                                                type: 'item',
                                                caption: 'item 1',
                                                value: 'item1'
                                            },
                                            {
                                                type: 'item',
                                                caption: 'item 1',
                                                value: 'item1'
                                            },
                                            {
                                                type: 'item',
                                                caption: 'item 2',
                                                value: 'item2'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'item',
                                        caption: 'item 4',
                                        value: 'item4'
                                    },
                                    {
                                        type: 'item',
                                        caption: 'item 4',
                                        value: 'item4'
                                    },
                                    {
                                        type: 'item',
                                        caption: 'item 4',
                                        value: 'item4'
                                    }
                                ]
                            },
                            {
                                type: 'item',
                                caption: 'item 1',
                                value: 'item1'
                            },
                            {
                                type: 'item',
                                caption: 'item 2',
                                value: 'item2'
                            }
                        ]
                    },
                    {
                        type: 'item',
                        caption: 'item 4',
                        value: 'item4'
                    },
                    {
                        type: 'item',
                        caption: 'item 4',
                        value: 'item4'
                    },
                    {
                        type: 'item',
                        caption: 'item 4',
                        value: 'item4'
                    }
                ]
            },
            {
                type: 'submenu',
                activateOn: 'mouseenter',
                caption: 'Menu 1',
                items: [
                    {
                        type: 'item',
                        caption: 'item 1',
                        value: 'item1'
                    },
                    {
                        type: 'item',
                        caption: 'item 2',
                        value: 'item2'
                    },
                    {
                        type: 'submenu',
                        activateOn: 'mouseenter',
                        caption: 'submenu 1',
                        dropdownPosition: 'horizontal',
                        items: [
                            {
                                type: 'item',
                                caption: 'item 1',
                                value: 'item1'
                            },
                            {
                                type: 'item',
                                caption: 'item 2',
                                value: 'item2'
                            }
                        ]
                    },
                    {
                        type: 'item',
                        caption: 'item 4',
                        value: 'item4'
                    }
                ]
            },
            {
                type: 'submenu',
                activateOn: 'mouseenter',
                caption: 'Menu 2',
                items: [
                    {
                        type: 'item',
                        caption: 'item 1',
                        value: 'item1'
                    },
                    {
                        type: 'item',
                        caption: 'item 2',
                        value: 'item2'
                    },
                    {
                        type: 'submenu',
                        activateOn: 'mouseenter',
                        caption: 'submenu 1',
                        dropdownPosition: 'horizontal',
                        items: [
                            {
                                type: 'item',
                                caption: 'item 1',
                                value: 'item1'
                            },
                            {
                                type: 'item',
                                caption: 'item 2',
                                value: 'item2'
                            }
                        ]
                    },
                    {
                        type: 'item',
                        caption: 'item 4',
                        value: 'item4'
                    }
                ]
            }
        ]
    });

    console.log(menu);
    document.getElementById('menu').appendChild(menu.rootEl);

});
