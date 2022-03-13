export function checkPermissions() {
  var location = window.location;
  var isSecureOrigin =
    location.protocol === "https:" || location.host === "localhost";
  if (!isSecureOrigin) {
    alert(
      "getUserMedia() must be run from a secure origin: HTTPS or localhost." +
        "\n\nChanging protocol to HTTPS"
    );
    location.protocol = "HTTPS";
  }
}
