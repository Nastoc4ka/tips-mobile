import { avatar } from '../assets/images'
const users = [
    {
        id: 10000,
        firstName: 'Alex',
        lastName: 'Vlasova',
        avatar: avatar,
        role: 'admin',
        position: 'Администратор',
        password: 'qwerty',
        phone: '0501111111',
        organization: 'BlackDiamond',
        city: 'Kyiv',
    },
    {
        id: 10010,
        firstName: 'Valeriy',
        lastName: 'Vlasova',
        avatar: avatar,
        role: 'admin',
        position: 'Администратор',
        password: 'qwerty',
        phone: '0501111111',
        organization: 'BlackDiamond',
        city: 'Kyiv',
    },
    {
        id: 10001,
        firstName: 'John',
        lastName: 'Vlasova',
        avatar: 'png',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111112',
        organization: 'BlackDiamond',
        city: 'Odessa'
    },
    {
        id: 10002,
        firstName: 'Anna',
        lastName: 'Vlasova',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111113',
        organization: 'BlackDiamond',
        city: 'Sumy'
    },
    {
        id: 10003,
        firstName: 'Alex1',
        lastName: 'Vlasova',
        avatar: 'png',
        role: 'admin',
        position: 'Администратор',
        password: 'qwerty',
        phone: '0501111114',
        organization: 'Glovo',
        city: 'Kyiv',
    },
    {
        id: 10004,
        firstName: 'John1',
        lastName: 'Vlasova',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111115',
        organization: 'Glovo',
        city: 'Odessa'
    },
    {
        id: 10005,
        firstName: 'Anna1',
        lastName: 'Vlasova',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111116',
        organization: 'Glovo',
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

