import { useState,useEffect,useRef } from "react";
export default function useBottomNavVisibility(){
    const [visible, setVisible] = useState(true);

    const lastScrolly = useRef(0);
    const timeoutRef = useRef(null);

    useEffect(()=> {
        const handleScroll = ()=> {
            const currentScrolly = window.scrollY;

            const scrollDifference = Math.abs(currentScrolly - lastScrolly.current);
            if(scrollDifference < 100) return;

            if(currentScrolly > lastScrolly.current){
                setVisible(false);
            }
            else {
                setVisible(true);
                clearTimeout(timeoutRef.current);

                timeoutRef.current = setTimeout(()=> {
                    setVisible(false);
                },10000)
            }
            lastScrolly.current = currentScrolly;
            
        };
            window.addEventListener("scroll",handleScroll);
            return ()=> {
                window.removeEventListener("scroll",handleScroll);
                clearTimeout(timeoutRef.current);
            };
    },[]);
    return visible;
}
