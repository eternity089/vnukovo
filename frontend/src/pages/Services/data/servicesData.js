import BathImage from "../../../assets/img/price/bath.png"

export  const bathFiltersData = [
    {
        id : 1,
        title : 'По времени:',
        filters: [
            {
                id: 1,
                text : '2 часа - 3.000 руб.',
                modal: null
            },
            {
                id: 2,
                text : '3 часа - 3.600 руб.',
                modal: null
            },
            {
                id: 3,
                text : '4 часа - 4.000 руб.',
                modal: null
            },

        ]

    },
    {
        id:2,
        title: 'Купель',
        filters: [
            {
                id: 1,
                text: 'Горячая - 3.000 руб.',
                modal: null
            },
            {
                id: 2,
                text: 'Холодная - 1.500 руб.',
                modal: null
            },
            {
                id: 3,
                text: 'Наполнение (пихта, цитрусовые) - 1.000 руб.',
                modal: null
            }
        ]
    },
    {
        id:3,
        title: 'Дополнительные услуги',
        filters: [
            {
                id:1,
                text:'Парение - от 2.500 руб.',
                modal: null
            },
            {
                id:2,
                text:'Программы парения - от 6.000 руб.',
                modal: "program"
            },
            {
                id:3,
                text:'Веники: береза - 300 руб., дуб - 500 руб., пихта - 400 руб.',
                modal: null
            },
        ]
    }
]

export const homeFiltersData = [
    {
        id:1,
        title: 'Аренда',
        filters:[
            {
                id:1,
                text: '7.500 руб. при заселении до 4-х человек'
            },
            {
                id:2,
                text: 'Дополнительное место - 1.000 руб.'
            },
            {
                id:3,
                text: 'С животными - 1.000 руб.'
            },
        ]
    }
]

export const serviceImages = {
    bath: BathImage,
}