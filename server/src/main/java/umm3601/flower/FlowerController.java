package umm3601.flower;

import com.mongodb.MongoClient;
import com.mongodb.client.*;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

public class FlowerController {

    private final MongoCollection<Document> flowerCollection;
    private final MongoCollection<Document> commentCollection;

    public FlowerController(String dbName) throws IOException {
        // Set up our server address
        // (Default host: 'localhost', default port: 27017)
        // ServerAddress testAddress = new ServerAddress();

        // Try connecting to the server
        //MongoClient mongoClient = new MongoClient(testAddress, credentials);
        MongoClient mongoClient = new MongoClient(); // Defaults!

        // Try connecting to a database
        MongoDatabase db = mongoClient.getDatabase(dbName);

        flowerCollection = db.getCollection("flowers");
        commentCollection = db.getCollection("comments");
    }

    // List flowers
    public String listFlowers(Map<String, String[]> queryParams) {
        Document filterDoc = new Document();

        if (queryParams.containsKey("cultivar")) {
            String targetCultivar = queryParams.get("cultivar")[0];
            filterDoc = filterDoc.append("cultivar", targetCultivar);
        }

        if (queryParams.containsKey("source")) {
            String targetSource = queryParams.get("source")[0];
            filterDoc = filterDoc.append("source", targetSource);
        }

        if (queryParams.containsKey("gardenLocation")) {
            String targetLocation = queryParams.get("gardenLocation")[0];
            filterDoc = filterDoc.append("gardenLocation", targetLocation);
        }

        if (queryParams.containsKey("year")) {
            int targetYear = Integer.parseInt(queryParams.get("year")[0]);
            filterDoc = filterDoc.append("year", targetYear);
        }

        FindIterable<Document> matchingFlowers = flowerCollection.find(filterDoc);

        return JSON.serialize(matchingFlowers);
    }

    // Get a single flower
    public String getFlower(String id) {
        FindIterable<Document> jsonFlowers
                = flowerCollection
                .find(eq("_id", new ObjectId(id)));

        Iterator<Document> iterator = jsonFlowers.iterator();

        Document flower = iterator.next();

        return flower.toJson();
    }

    // Get all the names of the beds in the DB
    public String listBeds() {
        Document output = new Document();
        DistinctIterable<String> beds
                = flowerCollection
                .distinct("gardenLocation",String.class);

        for (String bed: beds){
            output.append(bed,bed);
        }

        return output.toJson();
    }

    public boolean postComment(String body){
        Document insert = new Document();
        Document parsed = Document.parse(body);

        commentCollection.insertOne(parsed);

        return true;
    }

    public boolean incrementLikes(String body){
        Document filter = new Document();
        Document parsed = Document.parse(body);
        filter.append("id", parsed.getString("plantID"));
        flowerCollection.updateOne(filter, new Document("$inc", new Document("thumbsUp", 1)));

        return true;
    }

    public boolean incrementVisits(String body){
        Document filter = new Document();
        Document parsed = Document.parse(body);
        filter.append("id", parsed.getString("plantID"));
        flowerCollection.updateOne(filter, new Document("$inc", new Document("flowerVisits", 1)));

        return true;
    }



    public boolean uploadFile(InputStream file){
        ExcelParser excelParser = new ExcelParser(file);
        excelParser.parseExcel();

        return true;
    }

}
