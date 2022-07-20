var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var dboperations = require('./dboperations');
const Product = require('./product');
const User = require('./user');
let port = process.env.PORT || 8090;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request, response, next)=>{
    console.log('middleware');
    next();
});

router.route('/cart/:id').get((request, response) => {
    dboperations.getCartById(request.params.id).then(result => {
        response.json(result[0])
    })
})

router.route('/carts').get((request, response) => {
    dboperations.getAllCarts().then(result => {
        response.json(result[0])
    })
})

router.route('/cart/:productId/:userId').delete((request, response) => {
    dboperations.removeCartItem(request.params.userId, request.params.productId).then(result => {
        response.status(202).json(result)
    })
})

router.route('/cart/add/:userId/:productId/:quantity/:name/:image/:price/:instock').post((request, response) => {
    dboperations.addProductToCart(request.params.userId, request.params.quantity, request.params.productId, request.params.name,
        request.params.image, request.params.price, request.params.instock).then(result => {
        response.status(201).json(result)
    })
})

router.route('/cart/update/:userId/:productId/:quantity').patch((request, response) => {
    dboperations.updateProductQuantityInCart(request.params.productId, request.params.userId, request.params.quantity)
    .then(result => {
        response.status(202).json(result)
    })
})

router.route('/users').get((request, response) => {
    dboperations.getUsers().then(result => {
        response.json(result[0])
    })
})

router.route('/user/:id').get((request, response) => {
    dboperations.getUserById(request.params.id).then(result => {
        response.json(result[0])
    })
})

router.route('/user/:email').get((request, response) => {
    dboperations.getUserByEmail(request.params.email).then(result => {
        response.json(result[0])
    })
})

router.route('/users').post((request, response) => {
    const user = new User("Test", "Test", "Test123", "test@gmail.com", "123456789", 0, "");
    dboperations.addUser(user).then(result => {
        response.status(201).json(result)
    })
})

router.route('/users').delete((request, response) => {
    dboperations.deleteUser("test@gmail.com").then(result => {
        response.status(202).json(result)
    })
})

router.route('/user/:id/:firstname/:lastname/:username').patch((request, response) => {
    dboperations.updateUser(request.params.id, request.params.firstname, request.params.lastname, request.params.username).then(result => {
        response.status(203).json(result)
    })
})

router.route('/userprofilepic').patch((request, response) => {
    dboperations.updateUserProfilePicture("test@gmail.com", "testpfp").then(result => {
        response.status(203).json(result)
    })
})

router.route('/user/:id/:password').patch((request, response) => {
    dboperations.updateUserPassword(request.params.id, request.params.password).then(result => {
        response.status(203).json(result)
    })
})

router.route('/products').get((request, response) => {
    dboperations.getProductId("Asus Zenbook 13 UX334").then(result => {
        let id = JSON.stringify(result[0][0].id);
        console.log(id)
    });
    dboperations.getProducts().then(result => {
        response.json(result[0])
    })
});

router.route('/product/:id').get((request, response) => {
    dboperations.getProduct(request.params.id).then(result => {
        response.json(result[0])
    })
});

router.route('/product').post((request, response) => {
    let description = '. Intel Core i7-1195G7 \n';
    description += '. Windows 11 Home \n';
    description += '. 14.2 inch LTPS 500 nits, 3120x2080 (264 PPI), 90Hz, 10 point multi-touch \n';
    description += '. Intel Iris Xe Graphics \n';
    description += '. 16GB LPDDR4x, 1TB SSD \n';
    let product = new Product("Huawei Matebook X Pro 2022", description, 2100, "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/pc/matebook-x-pro-2022/specs/gray.png", "Huawei,Laptop,Notebook,Intel", 1);
    dboperations.addProduct(product).then(result => {
        response.status(201).json(result)
    });
});


router.route('/product').delete((request, response) => {
    dboperations.deleteProduct(2).then(result => {
        response.status(201).json(result)
    })
});

router.route('/product').patch((request, response) => {
    let description = '. Intel Core i7-1185G7 \n';
    description += '. Windows 11 Home \n';
    description += '. 13 inch PixelSense™ Flow Display, 2880 x 1920 (267 PPI), 120Hz, 10 point multi-touch \n';
    description += '.  Intel Iris Xe Graphics \n';
    description += '. 32GB LPDDR4, 1TB SSD \n';
    let product = new Product("Microsoft Surface Pro 8", description, 1000, "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWFHUx?ver=52c7&q=90&m=6&h=468&w=830&b=%23FFFFFFFF&l=f&o=t&aim=true", "Microsoft,Laptop,Notebook,Intel", 1);
    dboperations.updateProduct(20, product).then(result => {
        response.status(201).json(result)
    })
});

app.listen(port);
console.log('Product API is runnning at ' + port);
