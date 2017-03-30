package umm3601.flower;

import javax.imageio.ImageIO;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.gridfs.GridFS;
import org.bson.Document;
import org.bson.conversions.Bson;

/*
Original code taken from http://javapapers.com/core-java/java-qr-code/
And then modified for our use
 */

public class QRCodeMaker {
//    private static String filePath = "server/src/main/resources/QRCode.png";
//    private static String qrCodeData = "Hello World!";
    private static String charset = "UTF-8";

    public final static String imageDirectoryPath = "QRCodes/";

//    public static void main(String[] args) throws WriterException, IOException,
//            NotFoundException {
//
//        //DO NOT CHANGE CODE BELOW THIS LINE
//        String charset = "UTF-8"; // or "ISO-8859-1"
//        Map hintMap = new HashMap();
//        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
//        //DO NOT CHANGE CODE ABOVE THIS LINE
//
//        createQRCode(qrCodeData, filePath, charset, hintMap, 200, 200);
//    }

    public QRCodeMaker (List<String> beds) throws WriterException, IOException {
        String url;
        String bedPath;
        Map hintMap = new HashMap();
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

        System.out.println(System.getProperty("user.dir"));

        System.out.println("About to create the directory");

        File imageDirectory = new File(imageDirectoryPath);
        imageDirectory.delete();
        imageDirectory.mkdir();

        System.out.println("Made the directory: " + imageDirectoryPath);

        for (String bed : beds){
            bedPath = imageDirectoryPath + bed + ".jpg";

            url = "http://174.138.66.146:9000/api/" + bed;

            createQRCode(url, bedPath, charset, hintMap, 500, 500);
        }
    }

    public static void createQRCode(String qrCodeData, String filePath,
                                    String charset, Map hintMap, int qrCodeheight, int qrCodewidth)
            throws WriterException, IOException {
        BitMatrix matrix = new MultiFormatWriter().encode(
                new String(qrCodeData.getBytes(charset), charset),
                BarcodeFormat.QR_CODE, qrCodewidth, qrCodeheight, hintMap);

        Object object = new Object();

        MatrixToImageWriter.writeToFile(matrix, filePath.substring(filePath
                .lastIndexOf('.') + 1), new File(filePath));


    }

    public static String readQRCode(String filePath, String charset, Map hintMap)
            throws FileNotFoundException, IOException, NotFoundException {
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(
                new BufferedImageLuminanceSource(
                        ImageIO.read(new FileInputStream(filePath)))));
        Result qrCodeResult = new MultiFormatReader().decode(binaryBitmap,
                hintMap);
        return qrCodeResult.getText();
    }
}

