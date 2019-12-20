import java.awt.image.SampleModel;
import java.util.concurrent.CompletionException;

import static java.lang.System.exit;
import static java.lang.System.out;

public class test {

    public static void main(String[] args)
    {
        final int NN = 100;
        final int EE = 200;
        int [] test1 = new int [NN];
        int [] test2 = new int [EE];
        int compteur = 0; 

        for(int i=0; i<NN; i++)
        {
            test1[i]=i;
        }

        for(int i=0; i<EE; i++)
        {
            test2[i] = test1[i-compteur];
            if(i%2 == 0)
            {
                compteur++;  
            }
        }

        for(int i=0; i<EE; i++)
        {
            System.out.println(i+"  "+test2[i]);
        }
    }
}