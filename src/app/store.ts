import { computed, inject } from "@angular/core";
import { Product } from "./layout/models/product"
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from "@ngrx/signals"
import {produce} from "immer"
import { Toaster } from "./services/toaster";
import { Cart } from "./layout/models/cart";
import {MatDialog} from "@angular/material/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "./layout/models/user";
import { Router } from "@angular/router";
import { Order } from "./layout/models/order";
import {withStorageSync} from "@angular-architects/ngrx-toolkit"
import { addUserReview, UserReview } from "./layout/models/user-review";

export type EcommerceState={
    products:Product[];
    category : string;
    wishlistItems:Product[];
    cartItems:Cart[];
    user : User | undefined;
    selectedProductId:string | undefined;
    loading:boolean;
    writeReview:boolean;
    menuSideBar:boolean;
    searchQuery:string;
}

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      {
        id: '1',
        name: 'Wireless Noise-Cancelling Headphones',
        description:
          'Premium wireless headphones with active noise cancellation and 30-hour battery life',
        price: 299.99,
        imageUrl: 'headphones.jpg',
        rating: 4.5,
        reviewCount: 6,
        isStock: true,
        Category: 'Electronics',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userName: 'Alex Johnson',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            title: 'Best headphones I have ever owned!',
            comment:
              'The noise cancellation is absolutely incredible. I use these daily for work calls and music. Battery life is outstanding — easily gets 28-30 hours.',
            reviewDate: new Date('2024-11-15'),
          },
          {
            id: 'r2',
            productId: '1',
            userName: 'Priya Sharma',
            userImageUrl: 'https://i.pravatar.cc/150?img=2',
            rating: 4,
            title: 'Great sound, slightly tight fit',
            comment:
              'Sound quality is premium and ANC works like a charm in noisy environments. Only downside is the headband feels a bit tight after 2+ hours of use.',
            reviewDate: new Date('2024-10-28'),
          },
          {
            id: 'r3',
            productId: '1',
            userName: 'Marcus Lee',
            userImageUrl: 'https://i.pravatar.cc/150?img=3',
            rating: 5,
            title: 'Worth every penny',
            comment:
              'I was hesitant about the price but these are absolutely worth it. Crystal clear audio, seamless Bluetooth pairing, and the case is very compact.',
            reviewDate: new Date('2024-10-10'),
          },
          {
            id: 'r4',
            productId: '1',
            userName: 'Sarah Mitchell',
            userImageUrl: 'https://i.pravatar.cc/150?img=4',
            rating: 3,
            title: 'Good but mic quality could be better',
            comment:
              'Love the listening experience but callers often say my voice sounds muffled on calls. ANC and battery are top-notch though.',
            reviewDate: new Date('2024-09-22'),
          },
          {
            id: 'r5',
            productId: '1',
            userName: 'David Nguyen',
            userImageUrl: 'https://i.pravatar.cc/150?img=5',
            rating: 5,
            title: 'Perfect for travel and remote work',
            comment:
              'Used these on a 14-hour flight and they were a game changer. ANC blocked out engine noise completely. Highly recommend for frequent travelers.',
            reviewDate: new Date('2024-09-05'),
          },
          {
            id: 'r6',
            productId: '1',
            userName: 'Emily Carter',
            userImageUrl: 'https://i.pravatar.cc/150?img=6',
            rating: 4,
            title: 'Sleek design and great battery',
            comment:
              'These look and feel premium. The 30-hour battery is no joke. My only wish is that they had a more customizable EQ in the companion app.',
            reviewDate: new Date('2024-08-18'),
          },
        ],
      },
      {
        id: '2',
        name: 'Smart 4K TV',
        description:
          '65-inch OLED Smart TV with HDR and built-in streaming apps',
        price: 1299.99,
        imageUrl: 'Smart-tv.jpg',
        rating: 2.5,
        reviewCount: 2,
        isStock: true,
        Category: 'Electronics',
        reviews: [
          {
            id: 'r2-1',
            productId: '2',
            userName: 'Priya Mishra',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            title: 'Best Smart Tv I have ever owned!',
            comment:
              'The sound system is absolutely incredible. ',
            reviewDate: new Date('2024-11-12'),
          },
          {
            id: 'r2-2',
            productId: '2',
            userName: 'Shanti Priya',
            userImageUrl: 'https://i.pravatar.cc/150?img=2',
            rating: 4,
            title: 'AMaxing Display and Great sound',
            comment:
              'Sound quality is premium and ANC works like a charm in noisy environments.',
            reviewDate: new Date('2024-10-28'),
          },
          
        ],
      },
      {
        id: '3',
        name: 'Professional Camera',
        description: 'Mirrorless digital camera with 4K video capabilities',
        price: 899.99,
        imageUrl: 'camera.jpg',
        rating: 3.5,
        reviewCount: 2,
        isStock: true,
        Category: 'Electronics',
        reviews: [
          {
            id: 'r3-1',
            productId: '3',
            userName: 'James Patel',
            userImageUrl: 'https://i.pravatar.cc/150?img=7',
            rating: 4,
            title: 'Great image quality, steep learning curve',
            comment:
              'The 4K video is stunning and the autofocus is snappy. However, the menu system is complex for beginners. Definitely a camera for enthusiasts.',
            reviewDate: new Date('2024-11-01'),
          },
          {
            id: 'r3-2',
            productId: '3',
            userName: 'Olivia Brown',
            userImageUrl: 'https://i.pravatar.cc/150?img=8',
            rating: 3,
            title: 'Good camera but battery life is disappointing',
            comment:
              'Image quality is solid and the body feels premium. But the battery drains fast — barely 200 shots per charge. You will need extra batteries for full-day shoots.',
            reviewDate: new Date('2024-10-14'),
          },
        ],
      },
      {
        id: '4',
        name: 'Classic Denim Jacket',
        description: 'Vintage-style denim jacket with modern fit',
        price: 799.99,
        imageUrl: 'denim.jpg',
        rating: 4.5,
        reviewCount: 3,
        isStock: true,
        Category: 'Clothing',
        reviews: [
          {
            id: 'r4-1',
            productId: '4',
            userName: 'Sophia Williams',
            userImageUrl: 'https://i.pravatar.cc/150?img=9',
            rating: 4,
            title: 'Absolutely love this jacket!',
            comment:
              'The fit is perfect and the denim feels high quality. It pairs well with almost everything in my wardrobe. Got so many compliments wearing it.',
            reviewDate: new Date('2024-11-10'),
          },
          {
            id: 'r4-2',
            productId: '4',
            userName: 'Ethan Clarke',
            userImageUrl: 'https://i.pravatar.cc/150?img=10',
            rating: 3,
            title: 'Stylish and well-made',
            comment:
              'Really nice vintage look. The stitching is clean and the buttons feel sturdy. Slightly stiff at first but softens up nicely after a few wears.',
            reviewDate: new Date('2024-10-20'),
          },
          {
            id: 'r4-3',
            productId: '4',
            userName: 'Mia Thompson',
            userImageUrl: 'https://i.pravatar.cc/150?img=11',
            rating: 4,
            title: 'Great jacket, sizing runs large',
            comment:
              'Love the style and the fabric weight is perfect for layering. Just a heads up — I had to size down. Otherwise a fantastic buy.',
            reviewDate: new Date('2024-09-30'),
          },
        ],
      },
      {
        id: '5',
        name: 'Cotton T-Shirt Pack',
        description: 'Set of 3 premium cotton t-shirts in essential colors.',
        price: 34.99,
        imageUrl: 'tshirt.jpg',
        rating: 4,
        reviewCount: 1,
        isStock: true,
        Category: 'Clothing',
        reviews: [
          {
            id: 'r5-1',
            productId: '5',
            userName: 'Shittal Patel',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 4,
            title: 'All colors aree totally nice and good quality!',
            comment:
              'Cloth quality is premium for this rates and the fit is perfect. I bought this pack in black, white, and gray and they have become my go-to tees for everyday wear.',
            reviewDate: new Date('2024-12-12'),
          },
        ],
      },
      {
        id: '6',
        name: 'Wool Winter Coat',
        description: 'Elegant wool-blend coat perfect for cold weather',
        price: 134.99,
        imageUrl: 'coat.jpg',
        rating: 5,
        reviewCount: 5,
        isStock: true,
        Category: 'Clothing',
         reviews: [
          {
            id: 'r6-1',
            productId: '6',
            userName: 'Anjali Singh',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            title: 'Warm, stylish, and great value!',
            comment:
              'Good for the price.',
            reviewDate: new Date('2024-08-12'),
          },
          {
            id: 'r6-2',
            productId: '6',
            userName: 'Saavi Sharma',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 1,
            title: 'Torned after first use',
            comment:
              'Dont buy its a waste of money.',
            reviewDate: new Date('2024-08-12'),
          },
          {
            id: 'r6-3',
            productId: '6',
            userName: 'Yashvi Shukla',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 2,
            title: 'Not worth the price',
            comment:
              'The coat looked good initially but after wearing it a couple of times, the fabric started pilling and it lost its shape. Definitely expected better quality for the price.',
            reviewDate: new Date('2024-08-12'),
          },
          {
            id: 'r6-4',
            productId: '6',
            userName: 'Richa Chaada',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 4,
            title: 'Warm and stylish, but sizing runs small',
            comment:
              'cant wash in machine and have to dry clean it. The coat is very warm and looks great, but I had to exchange it for a larger size as it runs small. Just be sure to size up when ordering.',
            reviewDate: new Date('2024-08-12'),
          },
          {
            id: 'r6-5',
            productId: '6',
            userName: 'Sakshi Mishra',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            title: 'Just loved the fit and the fabric',
            comment:
              'This coat exceeded my expectations. The wool blend is soft and the fit is very flattering. I get compliments every time I wear it. Highly recommend for anyone looking for a stylish winter coat.',
            reviewDate: new Date('2024-08-12'),
          },
        ],
      },
      {
        id: '7',
        name: 'Leather Watch',
        description: 'Classic analog watch with genuine leather strap',
        price: 149.99,
        imageUrl: 'watch.jpg',
        rating: 4,
        reviewCount: 3,
        isStock: true,
        Category: 'Accessories',
        reviews: [
          {
            id: 'r7-1',
            productId: '7',
            userName: 'Liam Foster',
            userImageUrl: 'https://i.pravatar.cc/150?img=12',
            rating: 5,
            title: 'Elegant and timeless design',
            comment:
              'This watch looks far more expensive than it is. The leather strap is soft and genuine, and the dial is clean and easy to read. Perfect for both casual and formal occasions.',
            reviewDate: new Date('2024-11-05'),
          },
          {
            id: 'r7-2',
            productId: '7',
            userName: 'Ava Robinson',
            userImageUrl: 'https://i.pravatar.cc/150?img=13',
            rating: 4,
            title: 'Beautiful watch, strap needs breaking in',
            comment:
              'The watch face is gorgeous and the movement is accurate. The leather strap was a bit stiff initially but has become very comfortable after a couple of weeks.',
            reviewDate: new Date('2024-10-17'),
          },
          {
            id: 'r7-3',
            productId: '7',
            userName: 'Noah Bennett',
            userImageUrl: 'https://i.pravatar.cc/150?img=14',
            rating: 3,
            title: 'Nice looks but clasp feels flimsy',
            comment:
              'The watch itself is very attractive and keeps great time. My only concern is that the buckle clasp feels a little cheap compared to the rest of the build quality.',
            reviewDate: new Date('2024-09-12'),
          },
        ],
      },
      {
        id: '8',
        name: 'Designer Sunglasses',
        description: 'UV-protected polarized sunglasses with premium frame',
        price: 129.99,
        imageUrl: 'sunglass.jpg',
        rating: 4,
        reviewCount: 3,
        isStock: true,
        Category: 'Accessories',
        reviews: [
          {
            id: 'r8-1',
            productId: '8',
            userName: 'Janki shah',
            userImageUrl: 'https://i.pravatar.cc/150?img=12',
            rating: 5,
            title: 'unique and elegant design',
            comment:
              'It gives me luxurious look and the UV protection is excellent. I wear these daily and they have held up well with no scratches on the lenses. Highly recommend for anyone looking for stylish sunglasses.',
            reviewDate: new Date('2024-11-05'),
          },
          {
            id: 'r8-2',
            productId: '8',
            userName: 'Ria nair',
            userImageUrl: 'https://i.pravatar.cc/150?img=13',
            rating: 1,
            title: 'Cheap quality',
            comment:
              'The sunglasses are not worth the price. The frame feels cheap and the lenses have scratches.',
            reviewDate: new Date('2024-10-17'),
          },
          {
            id: 'r8-3',
            productId: '8',
            userName: 'Noah Bennett',
            userImageUrl: 'https://i.pravatar.cc/150?img=14',
            rating: 3,
            title: 'Stylish but not durable',
            comment:
              'The sunglasses are very attractive and provide good UV protection. However, they are not very durable and the frame feels flimsy.',
            reviewDate: new Date('2024-09-12'),
          },
        ],
      },
      {
        id: '9',
        name: 'Smart Coffee Maker',
        description: 'WiFi-enabled coffee maker with programmable brewing',
        price: 199.99,
        imageUrl: 'coffee-maker.jpg',
        rating: 3.5,
        reviewCount: 5,
        isStock: true,
        Category: 'Home',
        reviews: [
          {
            id: 'r9-1',
            productId: '9',
            userName: 'Charlotte Evans',
            userImageUrl: 'https://i.pravatar.cc/150?img=15',
            rating: 5,
            title: 'Wake up to perfect coffee every morning!',
            comment:
              'The scheduling feature is a game changer. I set it the night before and wake up to freshly brewed coffee. The app is intuitive and the brew quality is excellent.',
            reviewDate: new Date('2024-11-12'),
          },
          {
            id: 'r9-2',
            productId: '9',
            userName: 'Henry Wilson',
            userImageUrl: 'https://i.pravatar.cc/150?img=16',
            rating: 4,
            title: 'Smart features work great, setup takes time',
            comment:
              'Once set up, the WiFi and app connectivity work reliably. Initial setup with my router took about 20 minutes. Coffee tastes great and the keep-warm function is solid.',
            reviewDate: new Date('2024-10-25'),
          },
          {
            id: 'r9-3',
            productId: '9',
            userName: 'Isabella Moore',
            userImageUrl: 'https://i.pravatar.cc/150?img=17',
            rating: 3,
            title: 'Decent coffee maker, app is buggy',
            comment:
              'The hardware itself works fine and makes good coffee. But the companion app crashes occasionally and the scheduling sometimes does not trigger. Needs a software update.',
            reviewDate: new Date('2024-10-05'),
          },
          {
            id: 'r9-4',
            productId: '9',
            userName: 'Lucas Martin',
            userImageUrl: 'https://i.pravatar.cc/150?img=18',
            rating: 3,
            title: 'Good concept, average execution',
            comment:
              'I like the idea of a smart coffee maker but the WiFi disconnects fairly often. Have to re-pair it every few days. The coffee itself is decent though.',
            reviewDate: new Date('2024-09-18'),
          },
          {
            id: 'r9-5',
            productId: '9',
            userName: 'Amelia Scott',
            userImageUrl: 'https://i.pravatar.cc/150?img=19',
            rating: 3,
            title: 'Mixed feelings — great hardware, weak software',
            comment:
              'Build quality is premium and it brews a clean cup. Unfortunately the smart features are let down by inconsistent app performance. Hoping for firmware improvements.',
            reviewDate: new Date('2024-08-30'),
          },
        ],
      },
      {
        id: '10',
        name: 'Robot Vacuum',
        description: 'Smart robot vacuum with mapping and scheduling',
        price: 399.99,
        imageUrl: 'Vaccum-cleaner.jpg',
        rating: 3.5,
        reviewCount: 6,
        isStock: false,
        Category: 'Home',
        reviews: [
          {
            id: 'r10-1',
            productId: '10',
            userName: 'Tejas shah',
            userImageUrl: 'https://i.pravatar.cc/150?img=15',
            rating: 5,
            title: 'Wake up to a clean home every day!',
            comment:
              'The mapping feature is fantastic. It learns the layout of my home and efficiently cleans every corner. The scheduling is reliable and it does a great job on both hardwood and carpet.',
            reviewDate: new Date('2024-11-12'),
          },
          {
            id: 'r10-2',
            productId: '10',
            userName: 'Paridhi Desai',
            userImageUrl: 'https://i.pravatar.cc/150?img=16',
            rating: 4,
            title: 'Smart features work well, but setup is a hassle',
            comment:
              'Not a user friendly setup process, especially connecting to WiFi. Once it’s up and running, the app controls and scheduling work well. It picks up dirt and pet hair effectively.',
            reviewDate: new Date('2024-10-25'),
          },
          {
            id: 'r10-3',
            productId: '10',
            userName: 'Ram mathur',
            userImageUrl: 'https://i.pravatar.cc/150?img=17',
            rating: 3,
            title: 'Decent vacuum, but app needs work',
            comment:
              'The vacuum itself does a decent job cleaning and the mapping is accurate. However, the app is buggy and sometimes fails to start the cleaning schedule. It’s a good vacuum but needs software improvements.',
            reviewDate: new Date('2024-10-05'),
          },
          {
            id: 'r10-4',
            productId: '10',
            userName: 'Rahul yadav',
            userImageUrl: 'https://i.pravatar.cc/150?img=18',
            rating: 3,
            title: 'Good concept, average execution',
            comment:
              'I like the idea of a robot vacuum but the WiFi disconnects fairly often. Have to re-pair it every few days. The cleaning performance is decent though, especially for pet hair.',
            reviewDate: new Date('2024-09-18'),
          },
          {
            id: 'r10-5',
            productId: '10',
            userName: 'Geet sharma',
            userImageUrl: 'https://i.pravatar.cc/150?img=19',
            rating: 3,
            title: 'Mixed feelings — great hardware, weak software',
            comment:
              'Build quality is premium and it cleans well on hard floors. Unfortunately the smart features are let down by inconsistent app performance. Hoping for firmware improvements.',
            reviewDate: new Date('2024-08-30'),
          },
        ],
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    selectedProductId: undefined,
    loading: false,
    writeReview:false,
    menuSideBar:false,
    searchQuery:''
  } as EcommerceState),
  withStorageSync({
    key: 'Eccomerce-store',
    select: ({ wishlistItems, cartItems, user }) => ({
      wishlistItems,
      cartItems,
      user,
    }),
  }),
  withComputed(
    ({ category, products, wishlistItems, cartItems, selectedProductId ,searchQuery}) => ({
      filteredProducts: computed(() => {
        const cat = category().toLowerCase();
        return cat === 'all'
          ? products()
          : products().filter((p) => p.Category.toLowerCase() === cat);
      }),
      filteredProductsForSearch: computed(() => {
        const cat = category().toLowerCase();
        const searchterm = searchQuery().toLowerCase();

        return cat === 'all'
          ? products().filter((p) => p.name.toLowerCase().includes(searchterm))
          : products().filter((p) => p.Category.toLowerCase() === cat && p.name.toLowerCase().includes(searchterm));
        }),
      wishlistCount: computed(() => wishlistItems().length),
      cartItemsCount: computed(() =>
        cartItems().reduce((acc, item) => acc + item.quantity, 0),
      ),
      selectedProdct: computed(() =>
        products().find((p) => p.id === selectedProductId()),
      ),
    }),
  ),
  withMethods(
    (
      store,
      toaster = inject(Toaster),
      Matdialog = inject(MatDialog),
      router = inject(Router),
    ) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
      }),
      addToWishlist: (product: Product) => {
        const updatedWishListitems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { wishlistItems: updatedWishListitems });
        toaster.success('Product added to wishlist!');
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store
            .wishlistItems()
            .filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist!');
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
        toaster.success('All products removed from wishlist!');
      },

      addToCart: (product: Product, quantity = 1) => {
        const existingItemindex = store
          .cartItems()
          .findIndex((i) => i.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemindex !== -1) {
            draft[existingItemindex].quantity += quantity;
            return;
          }
          draft.push({ product, quantity });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success('Product added to cart!');
      },

      setItemsQuantity(params: { productId: string; quantity: number }) {
        const index = store
          .cartItems()
          .findIndex((i) => i.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });

        patchState(store, { cartItems: updated });
      },

      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });

        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
        toaster.success('All wishlist items added to cart!');
      },

      moveToWishlist: (product: Product) => {
        const updatedCartItems = store
          .cartItems()
          .filter((i) => i.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, {
          cartItems: updatedCartItems,
          wishlistItems: updatedWishlistItems,
        });
        toaster.success('Product added to wishlist!');
      },

      removeFromCart: (product: Product) => {
        const updatedCartItems = store
          .cartItems()
          .filter((i) => i.product.id !== product.id);
        patchState(store, { cartItems: updatedCartItems });
        toaster.success('Product removed from Cart!');
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          Matdialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });
        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store
              .cartItems()
              .reduce(
                (acc, item) => acc + item.quantity * item.product.price,
                0,
              ),
          ),
          items: store.cartItems(),
          paymentStatus: 'Success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            name: 'John Doe',
            email,
            imageUrl: 'profile.jpg',
          },
        });
        Matdialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            name: 'John Doe',
            email,
            imageUrl: 'profile.jpg',
          },
        });
        Matdialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },

      showWriteReview:()=>{
        patchState(store,{writeReview:true})
      },
      
      hideWriteReview:()=>{
        patchState(store,{writeReview:false})
      },

      addReview:async({title,comment,rating}:addUserReview)=>{
        patchState(store,{loading:true});
        const product =store.products().find(p=>p.id === store.selectedProdct()?.id);
        if(!product){
          patchState(store,{loading:false});
          return;
        }
        const newReview:UserReview={
          id: crypto.randomUUID(),
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || ';',
          rating,
          title,
          comment,
          reviewDate: new Date(),
        };

        const updatedProducts= produce(store.products(),draft=>{
          const index = draft.findIndex(p=>p.id=== product.id);
          draft[index].reviews.push(newReview);
          draft[index].rating= Math.round(draft[index].reviews.reduce((acc,r)=> acc + r.rating,0) / draft[index].reviews.length * 10) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise(resolve=> setTimeout(resolve,1000));
        patchState(store,{products:updatedProducts,loading:false,writeReview:false});
      },

      toggleMenuSidebar:()=>{
        patchState(store,{
          menuSideBar: !store.menuSideBar()
        })
      },
      setSearchQuery:(query:string)=>{
        patchState(store,{
          searchQuery:query
        });

        if(query != ''){
          patchState(store,{category:'all'});
          router.navigate(['products/all']);
        }
      }

     
    }),
  ),
);