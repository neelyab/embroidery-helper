const STORE = {
    stitches: [
        {
            name: 'satin stitch',
            imageUrl:'https://crewelghoul.com/wp-content/uploads/2019/12/satin-stitch-600x600.jpg',
            description: 'Bring thread through the back of the fabric. Take the thread in non-working hand and twist thread around needle 2-3 times. Bring needle down through the initial spot you came up through and pull tight.'
        },
        {
            name: 'back stitch',
            imageUrl: 'https://crewelghoul.com/wp-content/uploads/2019/12/back-stitch-600x600.jpg',
            description: 'Start with a straight stitch. Come up where your first stitch ends. Come up a space ahead, then stitch backwards where your previous stitch ended.'
        },
        {
            name: 'french knot',
            imageUrl: 'https://crewelghoul.com/wp-content/uploads/2019/12/french-knot-stitch-600x600.jpg',
            description: 'Bring thread through the back of the fabric. Take the thread in non-working hand and twist thread around needle 2-3 times. Bring needle down through the initial spot you came up through and pull tight.'
        },
        {
            name: 'stem stitch',
            imageUrl: 'https://crewelghoul.com/wp-content/uploads/2019/12/stem-stitch-600x600.jpg',
            description:'Come up through the back of the fabric and take a stitch with your needle, coming up about halfway between the first stitch. Pull through, and repeat.'
        }
    ],
    projects:[
        {
            name: 'clover flower embroidery pattern',
            imageUrl: 'https://crewelghoul.com/wp-content/uploads/2020/03/IMG_3950-800x445.jpeg',
            url:'https://crewelghoul.com/blog/how-to-embroider-a-clover-flower-embroidery-tutorial/',
            stitches: ['satin stitch', 'back stitch']
        },
        {
            name: 'rainbow embroidery pattern',
            imageUrl: 'https://crewelghoul.com/wp-content/uploads/2020/04/free-rainbow-embroidery-tutorial-800x445.png',
            url:'https://crewelghoul.com/blog/turkey-stitch-tutorial-free-rainbow-embroidery-pattern/',
            stitches: ['back stitch']
        },
        {
            name: 'lemon citrus embroidery pattern',
            imageUrl: 'https://crewelghoul.com/wp-content/uploads/2019/09/04858572-B85D-4B61-9732-5F9F8678BE7E-1440x2160.jpg',
            url: 'https://crewelghoul.com/blog/stitch-along-lemon-citrus-embroidery-pattern/',
            stitches: ['back stitch', 'satin stitch']
        },
        {
            name: 'lazy daisy flower tutorial',
            imageUrl:'https://crewelghoul.com/wp-content/uploads/2019/04/8170848238058048943_IMG_3698-scaled.jpg',
            url: 'https://crewelghoul.com/blog/lazy-daisy-stitch-tutorial/',
            stitches: ['french knot']
        }
  ]
};
export default STORE;