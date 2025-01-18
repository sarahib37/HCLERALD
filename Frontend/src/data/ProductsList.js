import Armchairs from '../assets/Armchair.webp'
import Table from '../assets/Tables.webp'
import Frames from '../assets/Frames.webp'
import Dining from '../assets/Dining.webp'
import Stool from '../assets/Stool.webp'
import Cabinets from '../assets/Cabinets.webp'
import Bookcase from '../assets/Bookcases.webp'
import Benches from '../assets/Benches.webp'
import Wardrobe from '../assets/Wardrobes.webp'

import Emulsion from '../assets/Emulsion.webp'
import Oil from '../assets/Oil.webp'
import Enamel from '../assets/Enamel.webp'
import Acrylic from '../assets/Acrylic.webp'
import Aluminum from '../assets/Aluminum.webp'
import Bronze from '../assets/Bronze.webp'
import Cement from '../assets/Cement.webp'
import Matte from '../assets/Matte.webp'
import Eggshell from '../assets/Eggshell.webp'

import Sneakers from '../assets/Sneaker.webp'
import Boot from '../assets/Boots.webp'
import FlipFlops from '../assets/Flips.webp'
import Heels from '../assets/Heels.webp'
import Espadrille from '../assets/Espadrille.webp'
import Loafers from '../assets/Loafers.webp'
import BoatShoes from '../assets/BoatShoes.webp'
import Mules from '../assets/Mules.webp'
import RunningShoes from '../assets/RunningShoes.webp'

import Snacks from '../assets/Snacks.webp'
import Sauce from '../assets/Sauces.webp'
import Dishes from '../assets/Dishes.webp'

import Farmers from '../assets/Farmers.webp'
import Street from '../assets/Street.webp'
import Food from '../assets/Food.webp'
import Christmas from '../assets/Christmas.webp'
import Craft from '../assets/Craft.webp'
import Cloth from '../assets/Cloth.webp'
import Vintage from '../assets/Vintage.webp'
import Drinks from '../assets/Drinks.webp'
import Pizza from '../assets/Pizza.webp'

import Silk from '../assets/Satin.webp'
import Cotton from '../assets/Cotton.webp'
import Polyester from '../assets/Polyester.webp'
import Wool from '../assets/Wool.webp'
import Leather from '../assets/Leather.webp'
import Chiffon from '../assets/Chiffon.webp'
import Elastane from '../assets/Elastane.webp'
import Lace from '../assets/Lace.webp'
import Nylon from '../assets/Nylon.webp'

const ProductsList = [
    {
        Category: 'Furniture',
        Description: [
            {
                Sub: 'Custom Designs:',
                Desc: 'Get bespoke furniture that meets your specific needs.'
            },
            {
                Sub: 'Materials Used:',
                Desc: 'Sustainably sourced woods and finishes.'
            }
        ],
        Images: [
            {
                Image: Armchairs,
                Desc: 'Armchairs'
            },
            {
                Image: Table,
                Desc: 'Tables, Sofas and Recliners'
            },
            {
                Image: Frames,
                Desc: 'Bed Frames and Nightstand'
            },
            {
                Image: Dining,
                Desc: 'Dining Sets'
            },
            {
                Image: Stool,
                Desc: 'Bar Stools'
            },
            {
                Image: Cabinets,
                Desc: 'Cabinets and Dressers'
            },
            {
                Image: Bookcase,
                Desc: 'Bookcases'
            },
            {
                Image: Benches,
                Desc: 'Benches'
            },
            {
                Image: Wardrobe,
                Desc: 'Wardrobes'
            }
        ]
    },

    {
        Category: 'Paint',
        Description: [
            {
                Sub: 'Eco-Friendly Options:',
                Desc: 'Vibrant colors that are safe for your home and the environment'
            },
            {
                Sub: 'Variety of Finishes:',
                Desc: 'From matte to gloss, we have something for every project.'
            }
        ],
        Images: [
            {
                Image: Emulsion,
                Desc: 'Emulsion and Bituminous Paints'
            },
            {
                Image: Oil,
                Desc: 'Oil and Plastic Paints'
            },
            {
                Image: Enamel,
                Desc: 'Enamel and Water-Based Paints'
            },
            {
                Image: Acrylic,
                Desc: 'Acrylic Paints'
            },
            {
                Image: Aluminum,
                Desc: 'Aluminium and Textured Paints'
            },
            {
                Image: Bronze,
                Desc: 'Bronze Paints'
            },
            {
                Image: Cement,
                Desc: 'Cement and Anti-corrosion Paints'
            },
            {
                Image: Matte,
                Desc: 'Matte and Rubber Paints'
            },
            {
                Image: Eggshell,
                Desc: 'Eggshell, Gloss, and Satin Paints'
            }
        ]
    },

    {
        Category: 'Shoes',
        Description: [
            {
                Sub: 'Handmade Quality:',
                Desc: 'Fashionable designs that prioritize comfort.'
            },
            {
                Sub: 'Diverse Styles:',
                Desc: 'From casual to formal, find the perfect pair.'
            }
        ],
        Images: [
            {
                Image: Sneakers,
                Desc: 'Sneakers'
            },
            {
                Image: Boot,
                Desc: 'Boots'
            },
            {
                Image: FlipFlops,
                Desc: 'Flip-Flops and Sandals'
            },
            {
                Image: Heels,
                Desc: 'Heels and Platforms'
            },
            {
                Image: Espadrille,
                Desc: 'Espadrille and Ballet Flats'
            },
            {
                Image: Loafers,
                Desc: 'Loafers, Dress Shoes, and Brogues'
            },
            {
                Image: BoatShoes,
                Desc: 'Boat Shoes and Monk Straps'
            },
            {
                Image: Mules,
                Desc: 'Mules and Clogs'
            },
            {
                Image: RunningShoes,
                Desc: 'Running Shoes'
            }
        ]
    },

    {
        Category: 'Packaged Food',
        Description: [
            {
                Sub: 'Local Flavors:',
                Desc: 'Delightful snacks, sauces, and traditional dishes ready to enjoy.'
            },
            {
                Sub: 'Health-Conscious Options:',
                Desc: 'We cater to a variety of dietary preferences.'
            }
        ],
        Images: [
            {
                Image: Snacks,
                Desc: 'Snacks'
            },
            {
                Image: Sauce,
                Desc: 'Sauces'
            },
            {
                Image: Dishes,
                Desc: 'Traditional Dishes'
            }
        ]
    },

    {
        Category: 'Market Stalls & Kiosks',
        Description: [
            {
                Sub: 'Custom Solutions:',
                Desc: 'Designed to suit your business needs with durability in mind.'
            },
            {
                Sub: 'Easy Assembly:',
                Desc: 'Quick setup for your market or event.'
            }
        ],
        Images: [
            {
                Image: Farmers,
                Desc: 'Farmers Market'
            },
            {
                Image: Street,
                Desc: 'Street Market'
            },
            {
                Image: Food,
                Desc: 'Food Stall'
            },
            {
                Image: Christmas,
                Desc: 'Christmas Stall'
            },
            {
                Image: Craft,
                Desc: 'Craft Stall'
            },
            {
                Image: Cloth,
                Desc: 'Cloth Stall'
            },
            {
                Image: Vintage,
                Desc: 'Vintage Stall'
            },
            {
                Image: Drinks,
                Desc: 'Drinks Stall'
            },
            {
                Image: Pizza,
                Desc: 'Pizza Stall'
            }
        ]
    },

    {
        Category: 'Clothing & Textiles',
        Description: [
            {
                Sub: 'Unique Styles:',
                Desc: 'Celebrate local fashion with blends of tradition and modernity.'
            },
            {
                Sub: 'Quality Fabrics:',
                Desc: 'Soft, durable materials sourced from local suppliers.'
            }
        ],
        Images: [
            {
                Image: Silk,
                Desc: 'Silk and Satin'
            },
            {
                Image: Cotton,
                Desc: 'Cotton and Linen'
            },
            {
                Image: Polyester,
                Desc: 'Polyester and Viscose'
            },
            {
                Image: Wool,
                Desc: 'Wool, Velvet, and Cashmere'
            },
            {
                Image: Leather,
                Desc: 'Leather and Denim'
            },
            {
                Image: Chiffon,
                Desc: 'Chiffon and Crêpe'
            },
            {
                Image: Elastane,
                Desc: 'Elastane and Cellulosic'
            },
            {
                Image: Lace,
                Desc: 'Lace and Synthetic Fibers'
            },
            {
                Image: Nylon,
                Desc: 'Nylon, Modal, and Rayon'
            }
        ]   
    }
]

export default ProductsList