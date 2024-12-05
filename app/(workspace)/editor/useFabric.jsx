"use client"

import React, { useEffect, useState } from "react"
import * as fabric from "fabric"

import { Button } from "@/components/ui/button"

import { FabricJSCanvas, useFabricJSEditor } from "./fabric"

export default function useFabric() {
  const { editor, onReady } = useFabricJSEditor()

  const history = []
  const [color, setColor] = useState("#35363a")
  const [cropImage, setCropImage] = useState(true)
  const [dimension, setDimension] = useState({ width: 400, height: 400 })

  useEffect(() => {
    if (!editor || !fabric) {
      return
    }

    if (cropImage) {
      editor.canvas.__eventListeners = {}
      return
    }

    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY
        var zoom = editor.canvas.getZoom()
        zoom *= 0.999 ** delta
        if (zoom > 20) zoom = 20
        if (zoom < 0.01) zoom = 0.01
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
        opt.e.preventDefault()
        opt.e.stopPropagation()
      })
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e
        if (evt.ctrlKey === true) {
          this.isDragging = true
          this.selection = false
          this.lastPosX = evt.clientX
          this.lastPosY = evt.clientY
        }
      })
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e
          var vpt = this.viewportTransform
          vpt[4] += e.clientX - this.lastPosX
          vpt[5] += e.clientY - this.lastPosY
          this.requestRenderAll()
          this.lastPosX = e.clientX
          this.lastPosY = e.clientY
        }
      })
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform)
        this.isDragging = false
        this.selection = true
      })
    }

    editor.canvas.renderAll()
  }, [editor])

  const addBackground = async () => {
    if (!editor || !fabric) {
      return
    }
    const img = await fabric.FabricImage.fromURL(
      "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg"
    );
    img.set({
      // scaleX: editor.canvas.width / img.width,
      // scaleY: editor.canvas.height / img.height,
      scaleX: 0.3,
      scaleY: 0.3,
    })
    editor.canvas.backgroundImage = img;
    // await fabric.FabricImage.fromURL(
    //   "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg",
    //   (image) => {
    //     // Set the background image directly
    //     console.log("background added");
    //     editor.canvas.backgroundImage = image;

    //     // Ensure the image is scaled to fit the canvas if necessary
    //     image.scaleToWidth(editor.canvas.width);
    //     image.scaleToHeight(editor.canvas.height);

    //     // Render the canvas
    //     editor.canvas.requestRenderAll();
    //     console.log("background added");
    //   }
    // );
  }

  const fromSvg = () => {
    fabric.loadSVGFromString(
      `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500" height="500" viewBox="0 0 500 500" xml:space="preserve">
    <desc>Created with Fabric.js 5.3.0</desc>
    <defs>
    </defs>
    <g transform="matrix(1 0 0 1 662.5 750)"  >
      <image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  xlink:href="https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg" x="-662.5" y="-750" width="1325" height="1500"></image>
    </g>
    <g transform="matrix(1 0 0 1 120.5 120.5)"  >
    <circle style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" r="20" />
    </g>
    <g transform="matrix(1 0 0 1 245.5 200.5)"  >
    <line style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x1="-75" y1="-50" x2="75" y2="50" />
    </g>
    <g transform="matrix(1 0 0 1 141.4 220.03)" style=""  >
        <text xml:space="preserve" font-family="Arial" font-size="16" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(53,54,58); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-16.9" y="-5.46" >inset</tspan><tspan x="-16.9" y="15.51" >text</tspan></text>
    </g>
    <g transform="matrix(1 0 0 1 268.5 98.5)"  >
    <rect style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  x="-20" y="-20" rx="0" ry="0" width="40" height="40" />
    </g>
    </svg>`,
      (objects, options) => {
        editor.canvas._objects.splice(0, editor.canvas._objects.length)
        editor.canvas.backgroundImage = objects[0]
        const newObj = objects.filter((_, index) => index !== 0)
        newObj.forEach((object) => {
          editor.canvas.add(object)
        })

        editor.canvas.renderAll()
      }
    )
  }

  //* Init canvas
  useEffect(() => {
    if (!editor || !fabric) {
      return
    }
    editor.canvas.setDimensions(dimension)
    // addBackground();
    editor.canvas.renderAll()
  }, [addBackground, editor?.canvas.backgroundImage])

  const toggleSize = () => {
    editor.canvas.freeDrawingBrush.width === 12
      ? (editor.canvas.freeDrawingBrush.width = 5)
      : (editor.canvas.freeDrawingBrush.width = 12)
  }

  useEffect(() => {
    if (!editor || !fabric) {
      return
    }
    editor.canvas.freeDrawingBrush.color = color
    editor.setStrokeColor(color)
  }, [color])

  const toggleDraw = () => {
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode
  }
  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop())
    }
    editor.canvas.renderAll()
  }
  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop())
    }
  }

  const importPdf = async (pdfData) => {
    const pdfjsLib = window["pdfjs-dist/build/pdf"]
    pdfData = pdfData instanceof Blob ? await readBlob(pdfData) : pdfData
    const data = atob(
      pdfData.startsWith(Base64Prefix)
        ? pdfData.substring(Base64Prefix.length)
        : pdfData
    )
    const loadingTask = pdfjsLib.getDocument({ data })
    return loadingTask.promise.then((pdf) => {
      const numPages = pdf.numPages
      return new Array(numPages).fill(0).map((__, i) => {
        const pageNumber = i + 1
        return pdf.getPage(pageNumber).then((page) => {
          const viewport = page.getViewport({ scale: window.devicePixelRatio })
          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")
          canvas.height = viewport.height
          canvas.width = viewport.width
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          }
          const renderTask = page.render(renderContext)
          return renderTask.promise.then(() => canvas)
        })
      })
    })
  }

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length)
    history.splice(0, history.length)
    editor.canvas.renderAll()
  }

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject())
  }

  const onAddCircle = () => {
    editor.addCircle()
    // editor.addLine();
  }
  const onAddRectangle = () => {
    editor.addRectangle()
  }
  const addText = () => {
    editor.addText("inset text")
  }

  const exportSVG = () => {
    const svg = editor.canvas.toSVG()
    console.info(svg)
  }

  const enablePanning = (canvas) => {
    canvas.on("mouse:down", (event) => {
      canvas.isDragging = true
      canvas.selection = false // Tắt chế độ chọn đối tượng
      canvas.lastPosX = event.e.clientX
      canvas.lastPosY = event.e.clientY
    })

    canvas.on("mouse:move", (event) => {
      if (canvas.isDragging) {
        const e = event.e
        const vpt = canvas.viewportTransform
        vpt[4] += e.clientX - canvas.lastPosX // Di chuyển theo trục X
        vpt[5] += e.clientY - canvas.lastPosY // Di chuyển theo trục Y
        canvas.requestRenderAll()
        canvas.lastPosX = e.clientX
        canvas.lastPosY = e.clientY
      }
    })

    canvas.on("mouse:up", () => {
      canvas.isDragging = false
      canvas.selection = true // Bật lại chế độ chọn đối tượng
    })
  }

  return {
    editor,
    onReady,
    onAddCircle,
    onAddRectangle,
    addText,
    toggleDraw,
    clear,
    undo,
    redo,
    toggleSize,
    removeSelectedObject,
    setCropImage,
    color,
    setColor,
    exportSVG,
    fromSvg,
    cropImage,
    enablePanning,
    setDimension,
  }

  // return (
  //   <div className="App">
  //     <h1>FabricJS React Sample</h1>
  //     <Button onClick={onAddCircle}>Add circle</Button>
  //     <Button onClick={onAddRectangle} disabled={!cropImage}>
  //       Add Rectangle
  //     </Button>
  //     <Button onClick={addText} disabled={!cropImage}>
  //       Add Text
  //     </Button>
  //     <Button onClick={toggleDraw} disabled={!cropImage}>
  //       Toggle draw
  //     </Button>
  //     <Button onClick={clear} disabled={!cropImage}>
  //       Clear
  //     </Button>
  //     <Button onClick={undo} disabled={!cropImage}>
  //       Undo
  //     </Button>
  //     <Button onClick={redo} disabled={!cropImage}>
  //       Redo
  //     </Button>
  //     <Button onClick={toggleSize} disabled={!cropImage}>
  //       ToggleSize
  //     </Button>
  //     <Button onClick={removeSelectedObject} disabled={!cropImage}>
  //       Delete
  //     </Button>
  //     <Button onClick={(e) => setCropImage(!cropImage)}>Crop</Button>
  //     <label disabled={!cropImage}>
  //       <input
  //         disabled={!cropImage}
  //         type="color"
  //         value={color}
  //         onChange={(e) => setColor(e.target.value)}
  //       />
  //     </label>
  //     <Button onClick={exportSVG} disabled={!cropImage}>
  //       {" "}
  //       ToSVG
  //     </Button>
  //     <Button onClick={fromSvg} disabled={!cropImage}>
  //       fromsvg
  //     </Button>

  //     <div
  //       style={{
  //         border: `3px ${!cropImage ? "dotted" : "solid"} Green`,
  //         width: "500px",
  //         height: "500px"
  //       }}
  //     >
  //       <FabricJSCanvas className="sample-canvas w-full" onReady={onReady} />
  //     </div>
  //   </div>
  // );
}
