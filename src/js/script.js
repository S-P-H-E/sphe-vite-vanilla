import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap'
import Lenis from 'lenis'

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    // Smooth scrolling
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Animation begins here
    gsap.utils.toArray(".work-item").forEach((item) => {
        const img = item.querySelector(".work-item-img")
        const nameH1 = item.querySelector(".work-item-name h1")

        const split = SplitText.create(nameH1, {
            type: 'chars',
            mask: 'chars'
        })

        gsap.set(split.chars, { y: "125%"})

        split.chars.forEach((char, i) => {
            ScrollTrigger.create({
            trigger: item,
            start: `top+=${i * 25 - 250} top`,
            end: `top+=${i * 25 - 100} top`,
            scrub: 1,
            animation: gsap.fromTo(char, {
                y: '125%'
                }, {
                y: '0%',
                ease: 'none'
                })
            })
        })

        ScrollTrigger.create({
            trigger: item,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.5,
            animation: gsap.fromTo(img, {
                clipPath: 'polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)'
            }, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: 'none'
            })
        })

        ScrollTrigger.create({
            trigger: item,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 0.5,
            animation: gsap.fromTo(img, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            }, {
                clipPath: 'polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)',
                ease: 'none'
            })
        })
    })
})