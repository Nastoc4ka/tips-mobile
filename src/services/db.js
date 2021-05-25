import { avatar } from '../assets/images'
const users = [
    {
        id: 10000,
        username: 'Alex',
        avatar: avatar,
        role: 'admin',
        position: 'Администратор',
        password: 'qwerty',
        phone: '0501111111',
        organisation: 'BlackDiamond',
        city: 'Kyiv',
    },
    {
        id: 10010,
        username: 'Valeriy',
        avatar: avatar,
        role: 'admin',
        position: 'Администратор',
        password: 'qwerty',
        phone: '0501111111',
        organisation: 'BlackDiamond',
        city: 'Kyiv',
    },
    {
        id: 10001,
        username: 'John',
        avatar: '',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111112',
        organisation: 'BlackDiamond',
        city: 'Odessa'
    },
    {
        id: 10002,
        username: 'Anna',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111113',
        organisation: 'BlackDiamond',
        city: 'Sumy'
    },
    {
        id: 10003,
        username: 'Alex1',
        avatar: 'png',
        role: 'admin',
        position: 'Администратор',
        password: 'qwerty',
        phone: '0501111114',
        organisation: 'Glovo',
        city: 'Kyiv',
    },
    {
        id: 10004,
        username: 'John1',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111115',
        organisation: 'Glovo',
        city: 'Odessa'
    },
    {
        id: 10005,
        username: 'Anna1',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111116',
        organisation: 'Glovo',
        city: 'Sumy'
    },
];

const news = [
    {
        id: 100,
        userId: 10000,
        isRead: true,
        label: 'Корпоратив',
        description: 'Планируется провести корпоратив',
        date: 1621519062855,
        important: true,
        reactions: [
            {
                id: 1,
                userId: 10001,
                smile: ':('
            },
            {
                id: 2,
                userId: 10002,
                smile: ':)'
            }
        ]
    },
    {
        id: 101,
        userId: 10010,
        isRead: true,
        label: 'Корпоратив from Valera',
        description: 'Планируется провести корпоратив',
        date: 1622519065455,
        important: true,
        reactions: [
            {
                id: 1,
                userId: 10001,
                smile: ':('
            },
        ]
    },
    {
        id: 102,
        userId: 10002,
        isRead: false,
        label: 'Корпоратив',
        description: 'Планируется провести корпоратив',
        date: 1621519062855,
        important: false,
        reactions: [
            {
                id: 1,
                userId: 10001,
                smile: ':('
            },
            {
                id: 2,
                userId: 10002,
                smile: ':)'
            }
        ]
    },
    {
        id: 103,
        userId: 10003,
        isRead: true,
        label: 'Корпоратив2',
        description: 'Планируется другой провести корпоратив',
        date: 1621432755117,
        important: false,
        reactions: [
            {
                id: 3,
                userId: 10001,
                smile: ':('
            },
            {
                id: 4,
                userId: 10002,
                smile: ':)'
            }
        ]
    }
];

export {
    users,
    news
}

