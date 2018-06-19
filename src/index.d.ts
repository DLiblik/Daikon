declare module '@qiiu/daikon' {
    export interface Dictionary {
        getVR(group, element):string
        getDescription(group, element):string
    }

    export interface IInterpretedData {
        data:Buffer,
        numCols: number,
        numRows: number,
        min: number,
        max: number,
        minIndex:number,
        maxIndex:number,
    }

    export class Image {
        getTagSingleValueSafely<T>(group, element, index = 0):T|null
        getCols():number
        getRows():number
        getSeriesDescription():string
        getSeriesInstanceUID():string
        getSeriesNumber():number
        getEchoNumber():number
        getImagePosition():number[]
        getImagePositionSliceDir(sliceDirIndex:number):number
        getSliceLocation():number
        getSliceLocationVector():number[]
        getImageNumber():number
        getTemporalPosition():number
        getTemporalNumber():number
        getSliceGap():number
        getSliceThickness():number
        getImageMax():number
        getImageMin():number
        getDataScaleSlope():number
        getDataScaleIntercept():number
        getWindowWidth():number
        getWindowCenter():number
        getPixelSpacing():number[]
        getImageType():string[]
        getBitsStored():number
        getBitsAllocated():number
        getFrameTime():number
        getAcquisitionMatrix():number[]
        getTR():number
        getTag(group:number, element:number):Tag
        getPixelData():Tag
        getRawData():ArrayBuffer
        getInterpretedData(asArray:boolean, asObject:boolean, frameIndex?:number):Float32Array|number[]|IInterpretedData
        hasPixelData():boolean
        getOrientation():string
        isMosaic():boolean
        isPalette():boolean
        isCompressed():boolean
        isCompressedJPEG():boolean
        isCompressedJPEGLossless():boolean
        isCompressedJPEGBaseline():boolean
        isCompressedJPEG2000():boolean
        isCompressedRLE():boolean
        getNumberOfFrames():number
        getPixelRepresentation():number
        getPhotometricInterpretation():string
        getPatientName():string
        getPatientID():string
        getStudyTime():string
        getTransferSyntax():string
        getStudyDate():string
        getPlanarConfig():number
        getImageDescription():string
        getDataType():number
        getEncapsulatedData():Tag[]
        getAllInterpretedPrivateData():string
        toString():string
    }

    export class Parser {
        parse(data:DataView):Image
        static verbose:boolean
        static isMagicCookieFound(data:DataView):boolean
    }

    export interface IProgressReporter {
        drawProgress(percent:number, label:string):void
    }

    export class Series {
        toString():string
        getName():string
        addImage(image:Image):void
        matchesSeries(image:Image):boolean
        buildSeries():void
        concatenateImageData(progressMeter:IProgressReporter, onFinishedImageRead:(err:any) => void):void
        static parseImage(data:DataView):Image
    }

    export class Tag {
        toString(level:number, html:boolean):string
        toString(html:boolean):string
        toHTMLString(level:number):string
        isTransformSyntax():boolean
        isPixelData():boolean
        isPrivateData():boolean
        hasInterpretedPrivateData():boolean
        isSublistItem():boolean
        isSublistItemDelim():boolean
        isSequenceDelim():boolean
        isMetaLength():boolean
        static createId(group:number, element:number):string
    }
}
