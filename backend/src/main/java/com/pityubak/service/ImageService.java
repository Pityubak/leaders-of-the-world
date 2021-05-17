package com.pityubak.service;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

import javax.imageio.ImageIO;
import javax.servlet.http.Part;

import org.springframework.stereotype.Service;

import com.pityubak.repository.ImageRepository;

@Service
public class ImageService implements ImageRepository {

	@Override
	public String getBase64FromImage(Part part) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] imageInByte;
		try {

			BufferedImage plainImage = ImageIO.read(part.getInputStream());
			BufferedImage scaledImage = scale(plainImage);

			ImageIO.write(scaledImage, "jpg", baos);
			imageInByte = baos.toByteArray();
			baos.flush();
			baos.close();
		} catch (IOException e) {
			throw new UpdateAvatarException("Failed to update avatar.");
		}

		return Base64.getEncoder().encodeToString(imageInByte);
	}


	private BufferedImage scale(BufferedImage image) {
		int maxWidth = 200;
		int maxHeight = 200;
		if (image.getWidth() >= image.getHeight() && image.getWidth() > maxWidth) {
			int newHeight = (int) (image.getHeight() * ((float) maxWidth / image.getWidth()));
			return getBufferered(image.getScaledInstance(maxWidth, newHeight, BufferedImage.SCALE_SMOOTH), maxWidth,
					newHeight);
		} else if (image.getHeight() > image.getWidth() && image.getHeight() > maxHeight) {
			int newWidth = (int) (image.getWidth() * ((float) maxHeight / image.getHeight()));
			return getBufferered(image.getScaledInstance(newWidth, maxHeight, BufferedImage.SCALE_SMOOTH), newWidth,
					maxHeight);
		} else {
			return image;
		}
	}

	private BufferedImage getBufferered(Image image, int width, int height) {
		BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		bufferedImage.createGraphics().drawImage(image, 0, 0, null);
		return bufferedImage;
	}

}
