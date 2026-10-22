const WHATSAPP_NUMBER = "595994740466";

export function getWhatsAppLink(message = "Hola, quisiera consultar sobre sus servicios de desarrollo web y software.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
