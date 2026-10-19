export async function onRequestPost({ request, env }) {
  try {
    const { name, email, subject, message } =
      await request.json();

    console.log("Datos recibidos:", {
      name: JSON.stringify(name),
      nameLength: name.length,
      email: JSON.stringify(email),
      subject: JSON.stringify(subject),
      messageLength: message.length
    });

    const checks = {
      nameIsString: typeof name === "string",
      nameNotEmpty: typeof name === "string" && name.trim().length > 0,
      nameMaxLength: typeof name === "string" && name.length <= 100,

      emailIsString: typeof email === "string",
      emailNotEmpty: typeof email === "string" && email.trim().length > 0,
      emailMaxLength: typeof email === "string" && email.length <= 254,
      emailFormat:
        typeof email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),

      subjectIsString: typeof subject === "string",
      subjectNotEmpty: typeof subject === "string" && subject.trim().length > 0,
      subjectMaxLength: typeof subject === "string" && subject.length <= 150,

      messageIsString: typeof message === "string",
      messageNotEmpty: typeof message === "string" && message.trim().length > 0,
      messageMaxLength: typeof message === "string" && message.length <= 5000
    };

    console.log("Validación del formulario:", checks);

    const valid = Object.values(checks).every(Boolean);

    if (!valid) {
      return Response.json(
        { error: "Datos inválidos" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM,
          to: [env.CONTACT_EMAIL],
          reply_to: email.trim(),
          subject: `Portafolio: ${subject.trim()}`,
          text: [
            `Nombre: ${name.trim()}`,
            `Correo: ${email.trim()}`,
            `Asunto: ${subject.trim()}`,
            "",
            "Mensaje:",
            message.trim()
          ].join("\n")
        })
      }
    );

    if (!response.ok) {
      console.error(
        "Error de Resend:",
        response.status,
        await response.text()
      );

      return Response.json(
        { error: "No se pudo enviar el correo" },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error de contacto:", error);

    return Response.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}