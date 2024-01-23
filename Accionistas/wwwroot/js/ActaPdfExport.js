import * as jsPDF from '../lib/node_modules/jspdf/dist/jspdf.node.js'

export default function CartaPoder() {

    let doc = new jsPDF.default('portrait', 'mm', [290, 210])

    let currentY = 0
    const maxWidth = 160
    const marginX = 30
    let font = 'Times'
    let fontType = 'Roman'
    let indexElements = []
    let currentPageIndex = 1
    // First Page

    doc.setFont(font, fontType)
    Title('Carta Poder')
    Body('Estimados señores')


    doc.close()
    doc.save(
        'Carta Poder ' + '.pdf'
    )

    //Functions
    function checkCurrentY(extraY = 0, type = '') {
        if (
            currentY + extraY >= 275 ||
            (type === 'Title' && currentY + extraY >= 240)
        ) {
            Footer()
            if (type === 'Index') {
                doc.setFontSize(10)
                doc.insertPage(currentPageIndex)
                currentPageIndex += 1
            } else {
                doc.addPage()
            }
            currentY = 20
        }
    }

    function Footer() {
        // doc.setFontSize(10)
        // doc.text('V1.0', 20, 280)
        // doc.text(' Proprietary & Confidential', 85, 280)
    }

    /*
     Options: { startY: 20, startX: marginX, maxWidthSubTitle: maxWidth }
    */
    function Title(text, options = {}) {
        let optionsLocal = {
            startY: 20,
            startX: marginX,
            maxWidth: maxWidth,
        }
        optionsLocal = {...optionsLocal, ...options}
        checkCurrentY(
            doc.getTextDimensions(text, {maxWidth: optionsLocal.maxWidth}).h,
            'Title'
        )
        doc.setFont(font, 'bold')
        doc.setFontSize(20)
        doc.text(text, optionsLocal.startX, (currentY += optionsLocal.startY), {
            maxWidth: optionsLocal.maxWidth,
        })
        doc.setFontSize(16)
        doc.setFont(font, 'normal')
        currentY += doc.getTextDimensions(text, {
            maxWidth: optionsLocal.maxWidth,
        }).h

        indexElements.push({
            title: text,
            page: doc.getCurrentPageInfo().pageNumber,
        })
    }

    /*
     Options: { startY: 20, startX: marginX, maxWidthSubTitle: maxWidth }
    */
    function SubTitle(text = '', options = {}) {
        let optionsLocal = {
            startY: 20,
            startX: marginX,
            maxWidth: maxWidth,
        }
        optionsLocal = {...optionsLocal, ...options}
        checkCurrentY(
            doc.getTextDimensions(text, {maxWidth: maxWidth}).h,
            'Title'
        )
        doc.setFont(font, 'bold')
        doc.setFontSize(20)
        doc.text(text, optionsLocal.startX, (currentY += optionsLocal.startY), {
            maxWidth: optionsLocal.maxWidth,
        })
        doc.setFontSize(16)
        doc.setFont(font, 'normal')
        currentY += doc.getTextDimensions(text, {
            maxWidth: optionsLocal.maxWidth,
        }).h
    }

    function Body(text, options = {}) {
        let optionsLocal = {
            startY: 5,
            startX: marginX,
            maxWidth: maxWidth,
        }
        optionsLocal = {...optionsLocal, ...options}
        checkCurrentY(
            doc.getTextDimensions(text, {maxWidth: optionsLocal.maxWidth}).h +
            optionsLocal.startY
        )
        doc.setFont(font, 'normal')
        doc.setFontSize(11)
        doc.text(text, optionsLocal.startX, (currentY += optionsLocal.startY), {
            maxWidth: optionsLocal.maxWidth - (optionsLocal.startX - 30),
            align: 'justify',
        })
        const lineH = doc.getTextDimensions(text, {
            maxWidth: optionsLocal.maxWidth,
        }).h
        currentY += lineH > 5 ? lineH - 10 : 5
    }

    function Dots(initX, endX, Y) {
        for (let i = initX; i < endX; i++) {
            doc.text('.', i, Y)
        }
    }


    function dotEnumeration(text, x = 40, y = 8) {
        checkCurrentY(
            doc.getTextDimensions(text, {
                maxWidth: maxWidth - x / 2 + 5,
            }).h + y
        )
        currentY += y
        doc.setFillColor('0')
        doc.setDrawColor(0)
        doc.circle(x, currentY, 1, 'F')
        doc.setFont(font, 'normal')
        doc.setFontSize(11)
        doc.text(text, x + 5, currentY + 1, {
            maxWidth: maxWidth - x / 2 + 5,
            align: 'justify',
        })
        const lineH = doc.getTextDimensions(text, {
            maxWidth: maxWidth - x / 2 + 5,
        }).h
        currentY += lineH > 5 ? lineH - 7 : 5
    }
}

