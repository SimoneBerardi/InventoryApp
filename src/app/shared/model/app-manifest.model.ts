export class AppManifest {
  private _versionTypes = {
    debug: "debug",
    beta: "beta",
    release: "release",
  }
  
  version: string;

  get isDebug() {
    return this._isVersionType(this._versionTypes.debug);
  }
  get isBeta() {
    return this._isVersionType(this._versionTypes.beta);
  }
  get isRelease() {
    return this._isVersionType(this._versionTypes.release);
  }

  private _isVersionType(type: string) {
    let versionType = this.version.split("-")[1] || "release";
    return versionType === type;
  }
}