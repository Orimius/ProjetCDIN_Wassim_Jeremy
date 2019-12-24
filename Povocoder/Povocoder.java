import java.awt.image.SampleModel;
import java.util.concurrent.CompletionException;

import static java.lang.System.exit;
import static java.lang.System.out;

public class Povocoder {

    // Processing SEQUENCE size (100 msec with 44100Hz samplerate)
    final static int SEQUENCE = StdAudio.SAMPLE_RATE/10;
    // Overlapping size (20 msec)
    final static int OVERLAP = SEQUENCE/5 ;
    // Best OVERLAP offset seeking window (15 msec)
    final static int SEEK_WINDOW = 3*OVERLAP/4;

    public static void main(String[] args) {
        if (args.length < 2)
        {
            System.out.println("usage: povocoder input.wav freqScale\n");
            exit(1);
        }

        try
        {
            String wavInFile = args[0];
            double freqScale = Double.valueOf(args[1]);
            String outPutFile= wavInFile.split("\\.")[0] + "_" + freqScale +"_";


            // Open input .wev file
            double[] inputWav = StdAudio.read(wavInFile);

            // Resample test
            double[] newPitchWav = resample(inputWav, freqScale);
            StdAudio.save(outPutFile+"Resampled.wav", newPitchWav);

            // Simple dilatation
            double[] outputWav   = vocodeSimple(newPitchWav, 1.0/freqScale);
            StdAudio.save(outPutFile+"Simple.wav", outputWav);

            // Simple dilatation with overlaping
            // outputWav = vocodeSimpleOver(newPitchWav, 1.0/freqScale);
            // StdAudio.save(outPutFile+"SimpleOver.wav", outputWav);

            // Simple dilatation with overlaping and maximum cross correlation search
            // outputWav = vocodeSimpleOverCross(newPitchWav, 1.0/freqScale);
            // StdAudio.save(outPutFile+"SimpleOverCross.wav", outputWav);

            joue(outputWav);

            // Some echo above all
            outputWav = echo(outputWav, 100, 0.7);
            StdAudio.save(outPutFile+"SimpleOverCrossEcho.wav", outputWav);

        }
        catch (Exception e)
        {
            System.out.println("Error: "+ e.toString());
        }
    }
    
    /**
    * Joue un signal et affiche son spectre
    * @param input
    */

    public static void joue(double[] input) {
        StdDraw.enableDoubleBuffering();
        StdAudio.play(input);

        StdDraw.setXscale(-10.0, input.length+10.0);
        StdDraw.setYscale(-1.5, 1.5);
        StdDraw.setPenRadius(0.0005);
        
        for(int i=0; i<input.length; i++)   {

            StdDraw.line(i,input[i],i,-input[i]);
        }
        StdDraw.show();
    }

    /**
    * Ré-échantillonne un signal en fonction d'une frquence donnée
    * @param input
    * @param freqScale
    * @return double[] : le signal ré-échantillonné 
    */

    public static double[] resample(double[] input, double freqScale)   {
        int inputSize = input.length;
        
        if(freqScale > 1)   {
            
            freqScale = (freqScale-1)/freqScale;
            int sizeDelete = (int)(inputSize*freqScale)-1;
            int outputSize = inputSize-sizeDelete;
            int compteur = 0;

            double [] output = new double [outputSize];

            for(int i=0; i<inputSize; i++) {
               
               if(i * freqScale - compteur > 1)  {
                    compteur++;
                }
                else {
                    output[i-compteur] = input[i];
                }
            }
            return output;
        }
        
        if(freqScale < 1)   {
            
            freqScale = (1-freqScale)/freqScale;
            int sizeAdd = (int)(inputSize*freqScale);
            int outputSize = inputSize+sizeAdd;
            int compteur = 0;

            double [] output = new double [outputSize];

            for(int i=0; i<inputSize; i++) {
                
                if(i * freqScale - compteur > 1)    {
                    output[i+compteur] = input[i];
                    compteur++;
                }
                output[i+compteur] = input[i];
            }
            return output;
        }
        return input;
    }   
    
    /**
    * Ajoute de l'écho a un signal avec delayMS de délais et atténué de attn
    * @param input
    * @param timeScale
    * @return double[] : le signal compressé ou dilaté 
    */

    public static double[] echo(double[] input, double delayMS, double attn)    {
        if(attn <= 0)   {
            return input;
        }
        
        int decallage = 44100 * (int)delayMS / 1000;
        int outputSize = input.length + decallage;
        double[] output = new double[outputSize];

        for (int i=0;i<input.length; i++)   {
            output[i] = input[i];
        }
        for (int i=decallage; i< outputSize; i++ )  {
            output[i] = (output[i] + input[i-decallage] * attn) /2;
        }
        return output;
    }

    /**
    * Dilate ou compresse le signal en fonction d'une fréquence
    * @param input
    * @param timeScale
    * @return double[] : le signal compressé ou dilaté 
    */

    public static double[] vocodeSimple(double[] input, double timeScale)   {
        if (timeScale < 1)  {
            
            int inputSize = input.length;
            int nbSeqInput = (int)inputSize / SEQUENCE;
            int nbSeqOutput = (int)(inputSize / timeScale) / SEQUENCE;
            int size = (nbSeqOutput * SEQUENCE) / nbSeqInput;
            int outputSize = nbSeqInput * size;
            int compteInput = 0;
            int compteOutput = 0;

            double[] output = new double [outputSize]; 

            for(int i=0; i<nbSeqInput-1; i++)   {
                
                for(int j=0; j<size; j++)   {
                    output[j+compteOutput] = input[j+compteInput];
                }
                compteOutput += size;

                for(int j=0; j<size; j++)   {
                    output[j+compteOutput] = input[j+compteInput];
                }
                compteInput += SEQUENCE;
            }
            return output;
        }
        if (timeScale > 1)  {
            
            int inputSize = input.length;            
            int nbSeqInput = (int)inputSize / SEQUENCE;
            int nbSeqOutput = (int)(inputSize / timeScale) / SEQUENCE;
            int size = (nbSeqOutput * SEQUENCE) / nbSeqInput;
            int outputSize = nbSeqInput * size;
            int compteInput = 0;
            int compteOutput = 0;

            double[] output = new double [outputSize]; 

            for(int i=0; i<nbSeqInput-1; i++)   {
                
                for(int j=0; j<size; j++)   {
                    output[j+compteOutput] = input[j+compteInput];
                }
                compteOutput += size;

                for(int j=0; j<size; j++)   {
                    output[j+compteOutput] = input[j+compteInput];
                }
                compteInput += SEQUENCE;
            }
            return output;
        }
        return input;

// Le calcul de la durée du signal de sortie :
// 
// 1) On calcul le nombre de valeur pour 100 ms soit 4 410 valeurs
//    ici c'est la constante SEQUENCE.
//
// 2) Ensuite on divise la taille du signal d'entrée par cette valeurs,
//    on trouve le nombre de séquence de 4 410 valeurs qui compose input :
//    int nbSeqInput = inputSize / SEQUENCE;
// 
// 3) La taille du signal de sortie doit être proche de la taille du 
//    signal d'entrée divisé par timeScale. Donc on peut trouver le nombre de
//    séquence qui compose le signal de sortie en divisant par SEQUENCE :
//    int nbSeqOutput = (int)(inputSize / timeScale) / SEQUENCE;
//
// 4) Donc la taille du signal de sortie est égale au nombre de fréquence
//    multiplié par la taille d'une fréquence soit :
//    outputSize = nbSeqInput * SEQUENCE;

    }
}