let date = new Date();

const iframe = document.createElement("iframe");            
iframe.width = "100%";
iframe.height = "890px";

switch (date.getMonth()+1) {

    case 1:
        if (date.getDay()+1 >= 1 && date.getDay()+1 <= 7){
            iframe.src = "easterEgg/newyear/newyear.html";
            document.getElementById('easterEgg').appendChild(iframe);
        }
        break;  

    case 2:
        if (date.getDay()+1 >= 1 && date.getDay()+1 <= 16){
            iframe.src = "easterEgg/valentine/valentine.html";
            document.getElementById('easterEgg').appendChild(iframe);
        }
        break;

    case 4:
        if (date.getDay()+1 >= 1 && date.getDay()+1 <= 22){
            iframe.src = "easterEgg/easter/easter.html";
            document.getElementById('easterEgg').appendChild(iframe);
        }
        break;

    case 9:
        if (date.getDay()+1 >= 10 && date.getDay()+1 <= 15){
            iframe.src = "easterEgg/developerDay/developerday.html";
            document.getElementById('easterEgg').appendChild(iframe);
        }
        break;

    case 12:
        if (date.getDay()+1 >= 15 && date.getDay()+1 <= 27){
            iframe.src = "easterEgg/christmas/christmas.html";
            document.getElementById('easterEgg').appendChild(iframe);
        }
        break;

    default:
        break;
        
}