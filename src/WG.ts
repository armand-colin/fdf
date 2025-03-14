export let WG: GPUDevice
export type WG = GPUDevice

export function setDevice(device: GPUDevice) {
    WG = device
}