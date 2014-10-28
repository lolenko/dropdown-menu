require.config({
    baseUrl: "scripts"
});

require(['Menu', 'MenuItem'], function(Menu, MenuItem) {

    'use strict';

    var menu = Menu.create({
        type: 'menu',
        orientation: 'horizontal',
        items: [
            {
                type: 'menu',
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
                        type: 'menu',
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

    console.log(menu);
    document.getElementById('menu').appendChild(menu.rootEl);

/*
    new Menu(document.querySelector('.menu_root'));
    [].forEach.call(document.querySelectorAll('.menu-item'), function(item) {
        new MenuItem(item);
    });
*/

});
