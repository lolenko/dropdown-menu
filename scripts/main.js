require.config({
    baseUrl: "scripts"
});

require(['Menu', 'MenuItem'], function(Menu, MenuItem) {

    'use strict';

    Menu.create({
        type: 'menu',
        orientation: 'horizontal',
        items: [
            {
                type: 'submenu',
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
                        caption: 'submenu 1',
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

    [].forEach.call(document.querySelectorAll('.menu-item'), function(item) {
        new MenuItem(item);
    });

});
