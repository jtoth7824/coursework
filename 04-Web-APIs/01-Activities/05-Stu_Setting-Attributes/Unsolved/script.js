var imgTag = document.querySelectorAll("img");
var aTag = document.querySelectorAll("a");

/*for (i = 0; i<imgTag.length; i++) {
    imgTag[i].src = "https://media.istockphoto.com/photos/lightning-bolt-storm-picture-id1060120946?k=6&m=1060120946&s=612x612&w=0&h=gNEcciKDijrBkZNV-57a19HAq-GCXejfPUNcsGBgntc=";
    imgTag[i].alt = "Picture: " + i;
}*/

imgTag[0].src = "https://media.istockphoto.com/photos/lightning-bolt-storm-picture-id1060120946?k=6&m=1060120946&s=612x612&w=0&h=gNEcciKDijrBkZNV-57a19HAq-GCXejfPUNcsGBgntc="
imgTag[1].src = "https://images.unsplash.com/photo-1550853123-b81beb0b1449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";
imgTag[2].src = "https://images-na.ssl-images-amazon.com/images/I/61dvVN2aOGL._AC_SX679_.jpg";

for (i = 0; i<aTag.length; i++) {
    aTag[i].href = "https://www.amazon.com";
}

aTag[0].alt = "https://www.amazon.com";
aTag[1].alt = "https://www.stackoverflow.com";
aTag[2].alt = "https://www.cnn.com";


