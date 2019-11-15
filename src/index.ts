/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { processColor } from 'react-native'

import NativeInterface from './internal/nativeInterface'
import { ImagePickerOptions, ImagePickerResponse } from './internal/types'

const DEFAULT_OPTIONS: ImagePickerOptions = {
  allowsEditing: false,
  cancelButtonTitle: 'Cancel',
  chooseFromLibraryButtonTitle: 'Choose from Library…',
  permissionDenied: {
    okTitle: "I'm sure",
    reTryTitle: 're-try',
    text: 'To be able to take pictures with your camera and choose images from your library.',
    title: 'Permission denied',
  },
  quality: 1.0,
  takePhotoButtonTitle: 'Take Photo…',
  tintColor: 'blue',
  title: 'Select a Photo',
}

type Callback = (response: ImagePickerResponse) => void
type OptionsOrCallback = ImagePickerOptions | Callback

class ImagePicker {
  showImagePicker(options: ImagePickerOptions, callback: Callback): void
  showImagePicker(callback: Callback): void

  showImagePicker(optionsOrCallback: OptionsOrCallback, callback?: Callback): void {
    if (typeof optionsOrCallback === 'function') {
      return NativeInterface.showImagePicker(
        {
          ...DEFAULT_OPTIONS,
          tintColor: processColor(DEFAULT_OPTIONS.tintColor),
        },
        optionsOrCallback,
      )
    }

    if (callback == null) {
      throw new Error('callback cannot be undefined')
    }

    return NativeInterface.showImagePicker(
      {
        ...DEFAULT_OPTIONS,
        ...optionsOrCallback,
        tintColor: processColor(optionsOrCallback.tintColor || DEFAULT_OPTIONS.tintColor),
      },
      callback,
    )
  }

  launchCamera(options: ImagePickerOptions, callback: Callback): void {
    return NativeInterface.launchCamera(
      {
        ...DEFAULT_OPTIONS,
        ...options,
        tintColor: processColor(options.tintColor || DEFAULT_OPTIONS.tintColor),
      },
      callback,
    )
  }

  launchImageLibrary(options: ImagePickerOptions, callback: Callback): void {
    return NativeInterface.launchImageLibrary(
      {
        ...DEFAULT_OPTIONS,
        ...options,
        tintColor: processColor(options.tintColor || DEFAULT_OPTIONS.tintColor),
      },
      callback,
    )
  }
}

export default new ImagePicker()

export * from './internal/types'
