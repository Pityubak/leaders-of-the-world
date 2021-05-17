package com.pityubak.repository;

import javax.servlet.http.Part;

public interface ImageRepository {

	String getBase64FromImage(Part part);

//	String getImageFromByteArray(byte[] avatar);
}
