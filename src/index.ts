import { RegionType } from './config'
import {
  createMkFileUrl,
  getUploadUrl,
  getResumeUploadedSize,
  getHeadersForMkFile,
  getHeadersForChunkUpload,
  filterParams
} from './utils'
import { UploadManager, Extra, Config, UploadOptions, UploadProgress, CustomError } from './upload'
import { imageMogr2, watermark, imageInfo, exif, pipeline } from './image'
import { Observable, IObserver } from './observable'
import compressImage from './compress'

function upload(
  file: File,
  key: string,
  token: string,
  putExtra: Partial<Extra>,
  config: Partial<Config>
): Observable<UploadProgress, CustomError> {

  const options: UploadOptions = {
    file,
    key,
    token,
    putExtra,
    config
  }

  return new Observable((observer: IObserver<UploadProgress, CustomError>) => {
    const uploadManager = new UploadManager(options, {
      onData: (data: UploadProgress) => observer.next(data),
      onError: (err: CustomError) => observer.error(err),
      onComplete: (res: any) => observer.complete(res)
    })
    uploadManager.putFile()
    return uploadManager.stop.bind(uploadManager)
  })
}

export {
  upload,
  RegionType,
  createMkFileUrl,
  getHeadersForChunkUpload,
  getResumeUploadedSize,
  getHeadersForMkFile,
  filterParams,
  getUploadUrl,
  imageMogr2,
  watermark,
  imageInfo,
  exif,
  compressImage,
  pipeline
}
