package umm3601.flower;

import com.google.zxing.WriterException;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by benek020 on 3/28/17.
 */
public class TestQRCodeMaker {

    private final File imageDirectory = new File(QRCodeMaker.imageDirectoryPath);

    @Before
    @Ignore
    public void deleteImages(){
        imageDirectory.delete();
        imageDirectory.mkdir();
    }

    @Test
    @Ignore
    public void countPNGImages() throws WriterException, IOException{
        System.out.println(System.getProperty("user.dir"));
        List codes = new ArrayList<String>();
        codes.add("NALDFS");
        codes.add("Please work");
        codes.add("More thigns");

        QRCodeMaker qrCodeMaker = new QRCodeMaker(codes);

        assertEquals(3, imageDirectory.list().length);
    }
}
