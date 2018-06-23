_satellite.pushAsyncScript(function(event, target, $variables){
  /*global _satellite,window*/

// Pixels: Category Page
switch (_satellite.getVar('primaryCategory')) {
    case 'bargain-books':
        window.r_injectImage('https://r.turn.com/r/beacon?b2=pX6Q31WDwkAU6ndRBKnhAgwfDNZFUY1q8OSWjgxYySf2YSojijCuADhyrLAEpLH_ZZXe6K-V1jvoO32HFRz4dw&cid=', null, null, 100);
        break;
    case 'toys-games':
        window.r_injectImage('https://r.turn.com/r/beacon?b2=fDUUPohLewTzl-ccmJnQvD-uoMnIRVgC_jETPYRETKD2YSojijCuADhyrLAEpLH_BklfvlDU99xsW4d4Y4bPYw&cid=', null, null, 100);
        break;
    case 'hobbies-collectibles':
        window.r_injectImage('https://r.turn.com/r/beacon?b2=k9eCd1Nua7r44JU3Oi6wewZPi7fSpjbuwH5qQKXS1zX2YSojijCuADhyrLAEpLH_6UmqZ6Oc5R3SIClGsqNkHQ&cid=', null, null, 100);
        break;
    case 'home-gifts':
        window.r_injectImage('https://r.turn.com/r/beacon?b2=4ALBhNXRvatwIDoIfoNU2AE3SwopNQ0gENh48X4oEi32YSojijCuADhyrLAEpLH_c0ZeleSTX1CBwO0dxpjYDQ&cid=', null, null, 100);
        break;
    case 'movies-tv':
        window.r_injectImage('https://r.turn.com/r/beacon?b2=f9UBiWNT9-OOBMziYQfc8bo0Qy068O_4hu7jmqG1eiT2YSojijCuADhyrLAEpLH_d6MeHGleNI7QK5AKS08T3Q&cid=', null, null, 100);
        break;
    case 'music':
        window.r_injectImage('https://r.turn.com/r/beacon?b2=Tde_vFwDH21Aih_WmngkIDqxIn9l143P_S2O_QSGCo72YSojijCuADhyrLAEpLH_33Z-ZKhBxy2XKjGpc6ui6g&cid=', null, null, 100);
        break;
    case 'books':
        switch (_satellite.getVar('subCategory1')) {
            case 'teens':
                window.r_injectImage('https://r.turn.com/r/beacon?b2=d7XSXKsRuNMwoU0zCrYHxOeVFWKZL1bGeJl0T18yYF32YSojijCuADhyrLAEpLH_SZo2-7ifdVxx8rOVb0Frgw&cid=', null, null, 100);
                break;
            case 'kids':
                window.r_injectImage('https://r.turn.com/r/beacon?b2=MN-yt9KEHK_U2BpAUpmBFz4kvdbeoJsx9Wyjktcp_e32YSojijCuADhyrLAEpLH_7_O-HkDlTlwaoByrA43uyQ&cid=', null, null, 100);
                break;
            default:
                break;
        }
        break;
    default:
        break;
}
});
