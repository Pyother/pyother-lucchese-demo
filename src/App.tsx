// * React:
import React, { useEffect, useState } from 'react';
import Parser from 'html-react-parser';

// * Liquid:
import tplHeader from './components/Header.liquid';
import tplContent from './components/Content.liquid';
import tplFooter from './components/Footer.liquid';
import { engine } from './engine';

// * Styles:
import './styles/globals.css';

// * Alpine:
import Alpine from 'alpinejs';


export default function App(): JSX.Element {
    const [headerHTML, setHeaderHTML] = useState<string>('')
    const [contentHTML, setContentHTML] = useState<string>('')
    const [footerHTML, setFooterHTML] = useState<string>('')

    useEffect(() => {
        async function loadTemplates() {
            const [h, c, f] = await Promise.all([
                engine.renderFile(tplHeader.toString()),
                engine.renderFile(tplContent.toString()),
                engine.renderFile(tplFooter.toString()),
            ])
            setHeaderHTML(h)
            setContentHTML(c)
            setFooterHTML(f)
        }
        loadTemplates()
    }, [])
    
    useEffect(() => {
        setTimeout(() => {
            const appEl = document.querySelector('.App')
            if (appEl) {
                Alpine.initTree(appEl)
            }
        }, 0)
    }, [headerHTML, contentHTML, footerHTML])
    

    return (
        <div className="App min-h-screen flex flex-col">
            {Parser(headerHTML)}
            {Parser(contentHTML)}
            {Parser(footerHTML)}
        </div>
    )
}
