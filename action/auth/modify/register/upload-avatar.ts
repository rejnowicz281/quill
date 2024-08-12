import debug from "@/lib/utils/general/debug";
import imagekit from "@/lib/utils/general/imagekit";

export default async function uploadAvatar(avatarFile: FormDataEntryValue | null) {
    if (!(avatarFile instanceof File) || (avatarFile.size <= 0 && !avatarFile.type.startsWith("image"))) return null;

    const fileBuffer = await avatarFile.arrayBuffer();

    const result = await imagekit.upload({
        file: Buffer.from(fileBuffer),
        fileName: avatarFile.name,
        folder: "/quill/avatars"
    });

    debug.log("photo upload result", result);

    const url = imagekit.url({
        src: result.url,
        transformation: [
            {
                height: 100,
                width: 100,
                crop: "force"
            }
        ]
    });

    debug.log("photo url", url);

    return url;
}
